import React from "react";
import { BiImage } from "react-icons/bi";
import { useTranslation } from "react-i18next";

const BlogFormFields = ({ formData, onInputChange, onImageChange }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      {/* Blog Title English */}
      <div>
        <label
          htmlFor="title_en"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("blog.titleEnglish")}
        </label>
        <input
          type="text"
          id="title_en"
          name="title_en"
          value={formData.title_en}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder={t("blog.titleEnglish")}
          required
        />
      </div>

      {/* Blog Title Arabic */}
      <div>
        <label
          htmlFor="title_ar"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("blog.titleArabic")}
        </label>
        <input
          type="text"
          id="title_ar"
          name="title_ar"
          value={formData.title_ar}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder={t("blog.titleArabic")}
          required
        />
      </div>

      {/* Blog Description English */}
      <div>
        <label
          htmlFor="description_en"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("blog.descriptionEnglish")}
        </label>
        <textarea
          id="description_en"
          name="description_en"
          value={formData.description_en}
          onChange={onInputChange}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder={t("blog.descriptionEnglish")}
          required
        ></textarea>
      </div>

      {/* Blog Description Arabic */}
      <div>
        <label
          htmlFor="description_ar"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("blog.descriptionArabic")}
        </label>
        <textarea
          id="description_ar"
          name="description_ar"
          value={formData.description_ar}
          onChange={onInputChange}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder={t("blog.descriptionArabic")}
          required
        ></textarea>
      </div>

      {/* Image Upload */}
      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("blog.blogImage")}
        </label>
        <div className="space-y-2">
          <input
            type="file"
            id="image"
            name="image"
            onChange={onImageChange}
            accept="image/*"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formData.imagePreview && (
            <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={formData.imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {!formData.imagePreview && (
            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BiImage className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">{t("blog.uploadImage")}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogFormFields;
