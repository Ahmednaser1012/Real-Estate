import React, { useState } from "react";
import {
  BiBookOpen,
  BiPlus,
  BiX,
  BiImage,
  BiEdit,
  BiTrash,
  BiCalendar,
} from "react-icons/bi";
import AdminCard from "../../ui/AdminCard";
import AdminButton from "../../ui/AdminButton";

const BlogsTab = () => {
  // Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    imagePreview: "",
  });

  // Sample blogs data
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Top 10 Real Estate Investment Tips for 2024",
      description:
        "Discover the most effective strategies for real estate investment in the current market. Learn about location analysis, market trends, and financial planning.",
      image: "/images/blog/blog (1).jpg",
      date: "2024-01-15",
      author: "Admin",
    },
    {
      id: 2,
      title: "How to Choose the Perfect Home Location",
      description:
        "A comprehensive guide to selecting the ideal location for your new home. Consider factors like schools, transportation, amenities, and future development plans.",
      image: "/images/blog/blog (2).jpg",
      date: "2024-01-12",
      author: "Admin",
    },
    {
      id: 3,
      title: "Real Estate Market Trends in Egypt 2024",
      description:
        "An in-depth analysis of the Egyptian real estate market, including price trends, popular areas, and investment opportunities in major cities.",
      image: "/images/blog/blog (3).jpg",
      date: "2024-01-10",
      author: "Admin",
    },
  ]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newBlog = {
        id: blogs.length + 1,
        title: formData.title,
        description: formData.description,
        image: formData.imagePreview || "/images/blog/blog (4).jpg",
        date: new Date().toISOString().split("T")[0],
        author: "Admin",
      };

      setBlogs((prev) => [newBlog, ...prev]);
      setIsSubmitting(false);
      handleCloseModal();
    }, 1000);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setFormData({
      title: "",
      description: "",
      image: null,
      imagePreview: "",
    });
  };

  // Handle edit modal open
  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      description: blog.description,
      image: null,
      imagePreview: blog.image,
    });
    setIsEditModalOpen(true);
  };

  // Handle edit modal close
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingBlog(null);
    setFormData({
      title: "",
      description: "",
      image: null,
      imagePreview: "",
    });
  };

  // Handle edit form submission
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const updatedBlog = {
        ...editingBlog,
        title: formData.title,
        description: formData.description,
        image: formData.imagePreview || editingBlog.image,
      };

      setBlogs((prev) =>
        prev.map((blog) => (blog.id === editingBlog.id ? updatedBlog : blog))
      );
      setIsSubmitting(false);
      handleCloseEditModal();
    }, 1000);
  };

  // Handle delete blog
  const handleDeleteBlog = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    }
  };

  return (
    <AdminCard
      title="Blogs Management"
      subtitle="Manage and create blog posts"
      icon={BiBookOpen}
    >
      <div className="space-y-6">
        {/* Add Blog Button */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">All Blogs</h3>
          <AdminButton
            variant="primary"
            size="md"
            icon={BiPlus}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add New Blog
          </AdminButton>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            >
              {/* Blog Image */}
              <div className="relative h-48 bg-gray-200">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/images/blog/blog (1).jpg";
                  }}
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    onClick={() => handleEditBlog(blog)}
                    className="p-1 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
                  >
                    <BiEdit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteBlog(blog.id)}
                    className="p-1 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
                  >
                    <BiTrash className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {blog.title}
                </h4>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                  {blog.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <BiCalendar className="w-3 h-3" />
                    {blog.date}
                  </div>
                  <span>By {blog.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {blogs.length === 0 && (
          <div className="text-center py-12">
            <BiBookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No blogs found</p>
            <AdminButton
              variant="primary"
              size="md"
              icon={BiPlus}
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Your First Blog
            </AdminButton>
          </div>
        )}
      </div>

      {/* Add Blog Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                Add New Blog
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <BiX className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Blog Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Blog Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Enter blog title"
                  required
                />
              </div>

              {/* Blog Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Enter blog description"
                  required
                ></textarea>
              </div>

              {/* Image Upload */}
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Blog Image
                </label>
                <div className="space-y-2">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
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
                        <p className="text-gray-500">
                          Image preview will appear here
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Adding..." : "Add Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Blog Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <BiEdit className="w-6 h-6 text-blue-600" />
                Edit Blog
              </h2>
              <button
                onClick={handleCloseEditModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <BiX className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              {/* Blog Title */}
              <div>
                <label
                  htmlFor="edit-title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Blog Title
                </label>
                <input
                  type="text"
                  id="edit-title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Enter blog title"
                  required
                />
              </div>

              {/* Blog Description */}
              <div>
                <label
                  htmlFor="edit-description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="edit-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Enter blog description"
                  required
                ></textarea>
              </div>

              {/* Image Upload */}
              <div>
                <label
                  htmlFor="edit-image"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Blog Image
                </label>
                <div className="space-y-2">
                  <input
                    type="file"
                    id="edit-image"
                    name="image"
                    onChange={handleImageChange}
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
                        <p className="text-gray-500">
                          Image preview will appear here
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Updating..." : "Update Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminCard>
  );
};

export default BlogsTab;
