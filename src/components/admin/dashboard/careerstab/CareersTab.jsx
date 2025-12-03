import React, { useState } from "react";
import { BiBookmark, BiPlus } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import AdminCard from "../../ui/AdminCard";
import AdminButton from "../../ui/AdminButton";
import DeleteConfirmModal from "../../ui/DeleteConfirmModal";
import CareersList from "./components/CareersList";
import CareerForm from "./components/CareerForm";
import {
  useGetAllCareersQuery,
  useCreateCareerMutation,
  useUpdateCareerMutation,
  useDeleteCareerMutation,
} from "../../../../features/careersApi";

const CareersTab = () => {
  const { t } = useTranslation();
  // API hooks
  const { data: careers = [], isLoading, error } = useGetAllCareersQuery();
  const [createCareer] = useCreateCareerMutation();
  const [updateCareer] = useUpdateCareerMutation();
  const [deleteCareer] = useDeleteCareerMutation();

  // Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCareer, setEditingCareer] = useState(null);
  const [deletingCareerId, setDeletingCareerId] = useState(null);
  const [deletingCareerTitle, setDeletingCareerTitle] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    title_en: "",
    title_ar: "",
    description_en: "",
    description_ar: "",
    type: "",

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
      const careerData = new FormData();
      careerData.append("title_en", formData.title_en);
      careerData.append("title_ar", formData.title_ar);
      careerData.append("description_en", formData.description_en);
      careerData.append("description_ar", formData.description_ar);
      careerData.append("type", formData.type);
 
      if (formData.image) {
        careerData.append("image", formData.image);
      }

      await createCareer(careerData).unwrap();
      setIsSubmitting(false);
      handleCloseModal();
    } catch (error) {
      console.error("Failed to create career:", error);
      alert("Failed to create career. Please try again.");
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
  const handleEditCareer = (career) => {
    setEditingCareer(career);
    setFormData({
      title_en: career.title_en || "",
      title_ar: career.title_ar || "",
      description_en: career.description_en || "",
      description_ar: career.description_ar || "",
      type: career.type || "",
 
      image: null,
      imagePreview: career.image,
    });
    setIsEditModalOpen(true);
  };

  // Handle edit modal close
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingCareer(null);
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
      const careerData = new FormData();
      careerData.append("title_en", formData.title_en);
      careerData.append("title_ar", formData.title_ar);
      careerData.append("description_en", formData.description_en);
      careerData.append("description_ar", formData.description_ar);
      careerData.append("type", formData.type);
 
      if (formData.image) {
        careerData.append("image", formData.image);
      }

      await updateCareer({ id: editingCareer.id, formData: careerData }).unwrap();
      setIsSubmitting(false);
      handleCloseEditModal();
    } catch (error) {
      console.error("Failed to update career:", error);
      alert("Failed to update career. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Handle delete career - open modal
  const handleDeleteCareer = (id, title) => {
    setDeletingCareerId(id);
    setDeletingCareerTitle(title);
    setIsDeleteModalOpen(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    try {
      await deleteCareer(deletingCareerId).unwrap();
      setIsDeleteModalOpen(false);
      setDeletingCareerId(null);
      setDeletingCareerTitle("");
    } catch (error) {
      console.error("Failed to delete career:", error);
      alert("Failed to delete career. Please try again.");
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <AdminCard
      title={t("career.management")}
      subtitle={t("career.manageAndCreate")}
      icon={BiBookmark}
    >
      <div className="space-y-6">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-white">{t("career.allCareers")}</h3>
            <p className="text-sm text-gray-400 mt-1">
              {careers.length} {careers.length !== 1 ? t("career.totalCareersPlural") : t("career.totalCareers")} 
            </p>
          </div>
          <AdminButton
            variant="primary"
            size="md"
            icon={BiPlus}
            onClick={() => setIsAddModalOpen(true)}
          >
            {t("career.addNewCareer")}
          </AdminButton>
        </div>

        {/* Careers List */}
        <CareersList
          careers={careers}
          isLoading={isLoading}
          error={error}
          onEdit={handleEditCareer}
          onDelete={handleDeleteCareer}
        />
      </div>

      {/* Add Career Modal */}
      {isAddModalOpen && (
        <CareerForm
          formData={formData}
          onInputChange={handleInputChange}
          onImageChange={handleImageChange}
          onSubmit={handleSubmit}
          onClose={handleCloseModal}
          isSubmitting={isSubmitting}
          isEditing={false}
        />
      )}

      {/* Edit Career Modal */}
      {isEditModalOpen && (
        <CareerForm
          formData={formData}
          onInputChange={handleInputChange}
          onImageChange={handleImageChange}
          onSubmit={handleEditSubmit}
          onClose={handleCloseEditModal}
          isSubmitting={isSubmitting}
          isEditing={true}
        />
      )}

      {/* Delete Confirm Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={deletingCareerTitle}
      />
    </AdminCard>
  );
};

export default CareersTab;
