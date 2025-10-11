import { FaTimes, FaExclamationTriangle } from "react-icons/fa";
import AdminButton from "../../../ui/AdminButton";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, itemName, itemType = "Item" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        {/* Header */}
        <div className="border-b px-6 py-4 flex items-center justify-between">
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
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <FaExclamationTriangle className="text-red-500 text-3xl" />
            </div>
            <div>
              <p className="text-gray-700 mb-2">
                Are you sure you want to delete this {itemType.toLowerCase()}?
              </p>
              {itemName && (
                <p className="text-gray-900 font-semibold">"{itemName}"</p>
              )}
              <p className="text-red-600 text-sm mt-3">
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t px-6 py-4 flex gap-3 justify-end">
          <AdminButton
            type="button"
            variant="outline"
            size="md"
            onClick={onClose}
          >
            Cancel
          </AdminButton>
          <AdminButton
            type="button"
            variant="danger"
            size="md"
            onClick={onConfirm}
          >
            Delete
          </AdminButton>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
