import React from "react";
import { BiBookOpen } from "react-icons/bi";
import BlogCard from "./BlogCard";

const BlogsGrid = ({ blogs, isLoading, error, onEdit, onDelete }) => {
  // Loading State
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading blogs...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading blogs: {error.message}</p>
      </div>
    );
  }

  // Empty State
  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <BiBookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 mb-4">No blogs found</p>
      </div>
    );
  }

  // Blogs Grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default BlogsGrid;
