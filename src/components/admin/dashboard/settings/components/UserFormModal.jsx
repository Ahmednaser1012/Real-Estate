import React, { useState, useEffect } from "react";
import { BiUser, BiEdit, BiX, BiEnvelope, BiLock, BiShield } from "react-icons/bi";
import AdminButton from "../../../ui/AdminButton";
import AdminInput from "../../../ui/AdminInput";
import PermissionsSection from "./PermissionsSection";

const UserFormModal = ({ isOpen, onClose, onSubmit, title, user, isEdit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "sub-admin",
    permissions: {
      properties: { view: true, add: false, edit: false, delete: false },
      blogs: { view: true, add: false, edit: false, delete: false },
      clients: { view: true, add: false, edit: false, delete: false },
      settings: { view: false, add: false, edit: false, delete: false },
    },
    isActive: true,
  });

  useEffect(() => {
    if (user && isEdit) {
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
        role: user.role,
        permissions: user.permissions,
        isActive: user.isActive,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "sub-admin",
        permissions: {
          properties: { view: true, add: false, edit: false, delete: false },
          blogs: { view: true, add: false, edit: false, delete: false },
          clients: { view: true, add: false, edit: false, delete: false },
          settings: { view: false, add: false, edit: false, delete: false },
        },
        isActive: true,
      });
    }
  }, [user, isEdit, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePermissionChange = (module, action) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [module]: {
          ...prev.permissions[module],
          [action]: !prev.permissions[module][action],
        },
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary to-secondary p-6 flex items-center justify-between z-10 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            {isEdit ? (
              <BiEdit className="text-3xl" />
            ) : (
              <BiUser className="text-3xl" />
            )}
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all duration-200"
          >
            <BiX className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info Section */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BiUser className="text-primary" />
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AdminInput
                label="Full Name *"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter full name"
                icon={BiUser}
                className="text-black"
              />

              <AdminInput
                label="Email *"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter email"
                icon={BiEnvelope}
                className="text-black"
              />
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BiLock className="text-primary" />
              Security & Access
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AdminInput
                label={`Password ${!isEdit ? "*" : ""}`}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required={!isEdit}
                placeholder={isEdit ? "Leave empty to keep current" : "Enter password"}
                icon={BiLock}
                className="text-black"
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-secondary dark:text-slate-300">
                  Role *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <BiShield className="h-5 w-5 text-muted" />
                  </div>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="input w-full pr-10 text-black"
                  >
                    <option value="admin">Admin</option>
                    <option value="sub-admin">Sub Admin</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Status Toggle */}
            <div className="mt-4 flex items-center gap-3 p-4 bg-white rounded-lg border-2 border-gray-200">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
                }
                className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label htmlFor="isActive" className="text-sm font-semibold text-gray-700 cursor-pointer">
                Active Account
              </label>
              <span className={`ml-auto px-3 py-1 rounded-full text-xs font-bold ${
                formData.isActive 
                  ? "bg-green-100 text-green-700" 
                  : "bg-red-100 text-red-700"
              }`}>
                {formData.isActive ? "ACTIVE" : "INACTIVE"}
              </span>
            </div>
          </div>

          {/* Permissions Section */}
          <PermissionsSection
            permissions={formData.permissions}
            onPermissionChange={handlePermissionChange}
          />

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t-2 border-gray-200">
            <AdminButton
              type="button"
              variant="outline"
              size="lg"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </AdminButton>
            <AdminButton
              type="submit"
              variant="primary"
              size="lg"
              className="flex-1 shadow-lg hover:shadow-xl"
            >
              {isEdit ? "Update User" : "Add User"}
            </AdminButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
