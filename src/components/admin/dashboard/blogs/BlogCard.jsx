import React from "react";
import { useTranslation } from "react-i18next";
import { BiEdit, BiTrash, BiCalendar } from "react-icons/bi";

const BlogCard = ({ blog, onEdit, onDelete }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Blog Image */}
      <div className="relative h-96 bg-gray-200">
        <img
          src={blog.image}
          alt={blog.title_en}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <button
            onClick={() => onEdit(blog)}
            className="p-1 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
            title="Edit blog"
          >
            <BiEdit className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => onDelete(blog.id, blog.title_en, blog.title_ar)}
            className="p-1 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
            title="Delete blog"
          >
            <BiTrash className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>

      {/* Blog Content */}
      <div className="p-4">
        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {isArabic ? blog.title_ar : blog.title_en}
        </h4>
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {isArabic ? blog.description_ar : blog.description_en}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <BiCalendar className="w-3 h-3" />
            {blog.created_at}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
