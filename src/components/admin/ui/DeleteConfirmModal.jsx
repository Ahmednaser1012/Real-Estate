import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import AdminButton from "./AdminButton";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title, itemName, itemType = "Item" }) => {
  const { t } = useTranslation();

  // Use provided title or construct from itemType
  const displayTitle = title || t("common.confirmDelete") || "Confirm Delete";
  
  // Use provided message or construct from itemType and itemName
  const displayMessage = title 
    ? t("blog.confirmDeleteMessage") 
    : `${t("common.areYouSure")} ${t("common.delete")} ${itemType.toLowerCase()}${itemName ? ` "${itemName}"` : ""}?`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <FaExclamationTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {displayTitle}
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                {displayMessage}
              </p>
              <div className="flex gap-3">
                <AdminButton
                  variant="outline"
                  size="md"
                  onClick={onClose}
                  className="flex-1"
                >
                  {t("common.cancel")}
                </AdminButton>
                <AdminButton
                  variant="danger"
                  size="md"
                  onClick={onConfirm}
                  className="flex-1"
                >
                  {t("common.delete")}
                </AdminButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;
