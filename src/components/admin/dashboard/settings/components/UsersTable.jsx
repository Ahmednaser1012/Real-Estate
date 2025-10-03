import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const UsersTable = ({ users, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-primary to-secondary">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white">
              Name
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white">
              Email
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white">
              Role
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white">
              Status
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white">
              Last Login
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr 
              key={user.id} 
              className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200"
            >
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {user.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                    user.role === "admin"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                      : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <button
                  onClick={() => onToggleStatus(user.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-medium transition-all duration-200 ${
                    user.isActive
                      ? "bg-green-100 text-green-700 hover:bg-green-200 hover:shadow-md"
                      : "bg-red-100 text-red-700 hover:bg-red-200 hover:shadow-md"
                  }`}
                >
                  {user.isActive ? (
                    <>
                      <FaCheckCircle className="text-green-600" />
                      <span>Active</span>
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="text-red-600" />
                      <span>Inactive</span>
                    </>
                  )}
                </button>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {user.lastLogin}
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200 hover:shadow-md hover:scale-110"
                    title="Edit"
                  >
                    <BiEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-200 hover:shadow-md hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete"
                    disabled={user.role === "admin"}
                  >
                    <BiTrash className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
