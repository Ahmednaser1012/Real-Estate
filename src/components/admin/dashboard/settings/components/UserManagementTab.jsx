import React, { useState } from "react";
import { BiPlus, BiUser } from "react-icons/bi";
import AdminButton from "../../../ui/AdminButton";
import UsersTable from "./UsersTable";
import UserFormModal from "./UserFormModal";

const UserManagementTab = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Sample users data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Admin User",
      email: "admin@realestate.com",
      role: "admin",
      isActive: true,
      lastLogin: "2024-01-20 10:30 AM",
      permissions: {
        properties: { view: true, add: true, edit: true, delete: true },
        blogs: { view: true, add: true, edit: true, delete: true },
        clients: { view: true, add: true, edit: true, delete: true },
        settings: { view: true, add: true, edit: true, delete: true },
      },
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@realestate.com",
      role: "sub-admin",
      isActive: true,
      lastLogin: "2024-01-19 03:45 PM",
      permissions: {
        properties: { view: true, add: true, edit: true, delete: false },
        blogs: { view: true, add: true, edit: false, delete: false },
        clients: { view: true, add: false, edit: false, delete: false },
        settings: { view: false, add: false, edit: false, delete: false },
      },
    },
    {
      id: 3,
      name: "Sarah Smith",
      email: "sarah@realestate.com",
      role: "sub-admin",
      isActive: false,
      lastLogin: "2024-01-15 09:20 AM",
      permissions: {
        properties: { view: true, add: false, edit: false, delete: false },
        blogs: { view: true, add: true, edit: true, delete: false },
        clients: { view: true, add: false, edit: false, delete: false },
        settings: { view: false, add: false, edit: false, delete: false },
      },
    },
  ]);

  // Handle add user
  const handleAddUser = (userData) => {
    const newUser = {
      id: users.length + 1,
      ...userData,
      lastLogin: "Never",
    };
    setUsers((prev) => [...prev, newUser]);
    setIsAddUserModalOpen(false);
  };

  // Handle edit user
  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsEditUserModalOpen(true);
  };

  // Handle update user
  const handleUpdateUser = (userData) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === editingUser.id
          ? {
              ...user,
              ...userData,
            }
          : user
      )
    );
    setIsEditUserModalOpen(false);
    setEditingUser(null);
  };

  // Handle delete user
  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  // Handle toggle user status
  const handleToggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-blue-200 shadow-md">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg">
            <BiUser className="text-3xl text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              User Management
            </h3>
            <p className="text-sm text-gray-600">
              Total Users: <span className="font-bold text-primary text-lg">{users.length}</span>
            </p>
          </div>
        </div>
        <AdminButton
          variant="primary"
          size="md"
          icon={BiPlus}
          onClick={() => setIsAddUserModalOpen(true)}
          className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          Add New User
        </AdminButton>
      </div>

      {/* Users Table */}
      <UsersTable
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onToggleStatus={handleToggleStatus}
      />

      {/* Add User Modal */}
      <UserFormModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onSubmit={handleAddUser}
        title="Add New User"
      />

      {/* Edit User Modal */}
      <UserFormModal
        isOpen={isEditUserModalOpen}
        onClose={() => {
          setIsEditUserModalOpen(false);
          setEditingUser(null);
        }}
        onSubmit={handleUpdateUser}
        title="Edit User"
        user={editingUser}
        isEdit
      />
    </div>
  );
};

// export default UserManagementTab;
// DISABLED: This component is currently not in use
