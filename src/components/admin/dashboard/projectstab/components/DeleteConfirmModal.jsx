import React from "react";
import { FaTimes, FaExclamationTriangle } from "react-icons/fa";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, projectTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Confirm Delete</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0">
              <FaExclamationTriangle className="text-4xl text-red-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Are you sure you want to delete this project?
              </h3>
              <p className="text-gray-600 mb-2">
                You are about to delete:{" "}
                <span className="font-semibold">{projectTitle}</span>
              </p>
              <p className="text-sm text-red-600">
                This action cannot be undone. All associated data including
                property types, galleries, and services will be removed.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 flex gap-3 justify-end rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
