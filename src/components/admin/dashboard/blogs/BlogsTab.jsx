import React, { useState } from "react";
import { BiBookOpen, BiPlus } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import AdminCard from "../../ui/AdminCard";
import AdminButton from "../../ui/AdminButton";
import DeleteConfirmModal from "../../ui/DeleteConfirmModal";
import BlogsGrid from "./BlogsGrid";
import AddBlogModal from "./AddBlogModal";
import EditBlogModal from "./EditBlogModal";
import {
  useGetAllBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from "../../../../features/blogsApi";

const BlogsTab = () => {
  const { t } = useTranslation();
  // API hooks
  const { data: blogs = [], isLoading, error } = useGetAllBlogsQuery();
  const [createBlog] = useCreateBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  // Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [deletingBlogId, setDeletingBlogId] = useState(null);
  const [deletingBlogTitle, setDeletingBlogTitle] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    title_en: "",
    title_ar: "",
    description_en: "",
    description_ar: "",
    image: null,
    imagePreview: "",
  });

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const blogData = new FormData();
      blogData.append("title_en", formData.title_en);
      blogData.append("title_ar", formData.title_ar);
      blogData.append("description_en", formData.description_en);
      blogData.append("description_ar", formData.description_ar);
      if (formData.image) {
        blogData.append("image", formData.image);
      }

      await createBlog(blogData).unwrap();
      setIsSubmitting(false);
      handleCloseModal();
    } catch (error) {
      console.error("Failed to create blog:", error);
      alert("Failed to create blog. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setFormData({
      title_en: "",
      title_ar: "",
      description_en: "",
      description_ar: "",
      image: null,
      imagePreview: "",
    });
  };

  // Handle edit modal open
  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title_en: blog.title_en || "",
      title_ar: blog.title_ar || "",
      description_en: blog.description_en || "",
      description_ar: blog.description_ar || "",
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
      title_en: "",
      title_ar: "",
      description_en: "",
      description_ar: "",
      image: null,
      imagePreview: "",
    });
  };

  // Handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const blogData = new FormData();
      blogData.append("title_en", formData.title_en);
      blogData.append("title_ar", formData.title_ar);
      blogData.append("description_en", formData.description_en);
      blogData.append("description_ar", formData.description_ar);
      if (formData.image) {
        blogData.append("image", formData.image);
      }

      await updateBlog({ id: editingBlog.id, formData: blogData }).unwrap();
      setIsSubmitting(false);
      handleCloseEditModal();
    } catch (error) {
      console.error("Failed to update blog:", error);
      alert("Failed to update blog. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Handle delete blog - open modal
  const handleDeleteBlog = (id, title) => {
    setDeletingBlogId(id);
    setDeletingBlogTitle(title);
    setIsDeleteModalOpen(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    try {
      await deleteBlog(deletingBlogId).unwrap();
      setIsDeleteModalOpen(false);
      setDeletingBlogId(null);
      setDeletingBlogTitle("");
    } catch (error) {
      console.error("Failed to delete blog:", error);
      alert("Failed to delete blog. Please try again.");
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <AdminCard
      title={t("blog.management")}
      subtitle={t("blog.manageAndCreate")}
      icon={BiBookOpen}
    >
      <div className="space-y-6">
        {/* Add Blog Button */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">{t("blog.allBlogs")}</h3>
          <AdminButton
            variant="primary"
            size="md"
            icon={BiPlus}
            onClick={() => setIsAddModalOpen(true)}
          >
            {t("blog.addNewBlog")}
          </AdminButton>
        </div>

        {/* Blogs Grid */}
        <BlogsGrid
          blogs={blogs}
          isLoading={isLoading}
          error={error}
          onEdit={handleEditBlog}
          onDelete={handleDeleteBlog}
        />
      </div>

      {/* Add Blog Modal */}
      <AddBlogModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        formData={formData}
        onInputChange={handleInputChange}
        onImageChange={handleImageChange}
        isSubmitting={isSubmitting}
      />

      {/* Edit Blog Modal */}
      <EditBlogModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSubmit={handleEditSubmit}
        formData={formData}
        onInputChange={handleInputChange}
        onImageChange={handleImageChange}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirm Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={deletingBlogTitle}
      />
    </AdminCard>
  );
};

export default BlogsTab;
