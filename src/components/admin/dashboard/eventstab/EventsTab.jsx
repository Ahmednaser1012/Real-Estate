import React, { useState } from "react";
import { BiCalendar, BiPlus } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import AdminCard from "../../ui/AdminCard";
import AdminButton from "../../ui/AdminButton";
import DeleteConfirmModal from "../../ui/DeleteConfirmModal";
import EventsList from "./components/EventsList";
import EventForm from "./components/EventForm";
import {
  useGetAllEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} from "../../../../features/eventsApi";

const EventsTab = () => {
  const { t } = useTranslation();
  // API hooks
  const { data: events = [], isLoading, error } = useGetAllEventsQuery();
  const [createEvent] = useCreateEventMutation();
  const [updateEvent] = useUpdateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();

  // Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deletingEventId, setDeletingEventId] = useState(null);
  const [deletingEventTitle, setDeletingEventTitle] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    title_en: "",
    title_ar: "",
    description_en: "",
    description_ar: "",
    date: "",
    start_time: "",
    end_time: "",
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
      const eventData = new FormData();
      eventData.append("title_en", formData.title_en);
      eventData.append("title_ar", formData.title_ar);
      eventData.append("description_en", formData.description_en);
      eventData.append("description_ar", formData.description_ar);
      
      if (formData.date) {
        eventData.append("date", formData.date);
      }
      if (formData.start_time) {
        eventData.append("start_time", formData.start_time);
      }
      if (formData.end_time) {
        eventData.append("end_time", formData.end_time);
      }
   
      if (formData.image) {
        eventData.append("image", formData.image);
      }

      await createEvent(eventData).unwrap();
      setIsSubmitting(false);
      handleCloseModal();
    } catch (error) {
      console.error("Failed to create event:", error);
      alert("Failed to create event. Please try again.");
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
      date: "",
      start_time: "",
      end_time: "",
      image: null,
      imagePreview: "",
    });
  };

  // Handle edit modal open
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    
    // Format date to YYYY-MM-DD if it exists
    let formattedDate = "";
    if (event.date) {
      const dateObj = new Date(event.date);
      formattedDate = dateObj.toISOString().split('T')[0];
    }
    
    // Format time to HH:mm if it exists (remove seconds if present)
    const formatTime = (timeStr) => {
      if (!timeStr) return "";
      // If time has seconds (HH:mm:ss), remove them
      return timeStr.substring(0, 5);
    };
    
    setFormData({
      title_en: event.title_en || "",
      title_ar: event.title_ar || "",
      description_en: event.description_en || "",
      description_ar: event.description_ar || "",
      date: formattedDate,
      start_time: formatTime(event.start_time),
      end_time: formatTime(event.end_time),
      image: null,
      imagePreview: event.image,
    });
    setIsEditModalOpen(true);
  };

  // Handle edit modal close
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingEvent(null);
    setFormData({
      title_en: "",
      title_ar: "",
      description_en: "",
      description_ar: "",
      date: "",
      start_time: "",
      end_time: "",
      image: null,
      imagePreview: "",
    });
  };

  // Handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const eventData = new FormData();
      eventData.append("_method", "POST");
      eventData.append("title_en", formData.title_en);
      eventData.append("title_ar", formData.title_ar);
      eventData.append("description_en", formData.description_en);
      eventData.append("description_ar", formData.description_ar);
      
      if (formData.date) {
        eventData.append("date", formData.date);
      }
      if (formData.start_time) {
        eventData.append("start_time", formData.start_time);
      }
      if (formData.end_time) {
        eventData.append("end_time", formData.end_time);
      }
 
      if (formData.image) {
        eventData.append("image", formData.image);
      }

      await updateEvent({ id: editingEvent.id, formData: eventData }).unwrap();
      setIsSubmitting(false);
      handleCloseEditModal();
    } catch (error) {
      console.error("Failed to update event:", error);
      const errorMessage = error?.data?.message || error?.message || "Failed to update event. Please try again.";
      const validationErrors = error?.data?.errors;
      
      if (validationErrors) {
        const errorDetails = Object.entries(validationErrors)
          .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
          .join("\n");
        alert(`Validation Error:\n${errorDetails}`);
      } else {
        alert(errorMessage);
      }
      setIsSubmitting(false);
    }
  };

  // Handle delete event - open modal
  const handleDeleteEvent = (id, title) => {
    setDeletingEventId(id);
    setDeletingEventTitle(title);
    setIsDeleteModalOpen(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    try {
      await deleteEvent(deletingEventId).unwrap();
      setIsDeleteModalOpen(false);
      setDeletingEventId(null);
      setDeletingEventTitle("");
    } catch (error) {
      console.error("Failed to delete event:", error);
      alert("Failed to delete event. Please try again.");
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <AdminCard
      title={t("events.management")}
      subtitle={t("events.manageAndCreate")}
      icon={BiCalendar}
    >
      <div className="space-y-6">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-white">{t("events.allEvents")}</h3>
            <p className="text-sm text-gray-400 mt-1">
              {events.length} {events.length !== 1 ? t("events.totalEventsPlural") : t("events.totalEvents")}  
            </p>
          </div>
          <AdminButton
            variant="primary"
            size="md"
            icon={BiPlus}
            onClick={() => setIsAddModalOpen(true)}
          >
            {t("events.addNewEvent")}
          </AdminButton>
        </div>

        {/* Events List */}
        <EventsList
          events={events}
          isLoading={isLoading}
          error={error}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
        />
      </div>

      {/* Add Event Modal */}
      {isAddModalOpen && (
        <EventForm
          formData={formData}
          onInputChange={handleInputChange}
          onImageChange={handleImageChange}
          onSubmit={handleSubmit}
          onClose={handleCloseModal}
          isSubmitting={isSubmitting}
          isEditing={false}
        />
      )}

      {/* Edit Event Modal */}
      {isEditModalOpen && (
        <EventForm
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
        title={deletingEventTitle}
      />
    </AdminCard>
  );
};

export default EventsTab;
