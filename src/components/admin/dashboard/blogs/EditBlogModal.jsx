import React from "react";
import { BiX, BiEdit } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import BlogFormFields from "./BlogFormFields";

const EditBlogModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onInputChange,
  onImageChange,
  isSubmitting,
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <BiEdit className="w-6 h-6 text-blue-600" />
            {t("blog.editBlog")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <BiX className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={onSubmit} className="p-6">
          <BlogFormFields
            formData={formData}
            onInputChange={onInputChange}
            onImageChange={onImageChange}
          />

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {t("common.cancel")}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
            >
              {isSubmitting ? t("blog.updateBlog") : t("blog.updateBlog")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlogModal;
