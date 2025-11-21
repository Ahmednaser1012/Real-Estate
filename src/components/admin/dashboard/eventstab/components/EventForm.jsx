import React from "react";
import { BiX, BiImage } from "react-icons/bi";

const EventForm = ({
  formData,
  onInputChange,
  onImageChange,
  onSubmit,
  onClose,
  isSubmitting,
  isEditing = false,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? "Edit Event" : "Add New Event"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <BiX className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          {/* Event Title English */}
          <div>
            <label
              htmlFor="title_en"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Event Title (English) *
            </label>
            <input
              type="text"
              id="title_en"
              name="title_en"
              value={formData.title_en}
              onChange={onInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter event title in English"
              required
            />
          </div>

          {/* Event Title Arabic */}
          <div>
            <label
              htmlFor="title_ar"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Event Title (Arabic) *
            </label>
            <input
              type="text"
              id="title_ar"
              name="title_ar"
              value={formData.title_ar}
              onChange={onInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="أدخل عنوان الحدث بالعربية"
              required
            />
          </div>

          {/* Event Description English */}
          <div>
            <label
              htmlFor="description_en"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description (English) *
            </label>
            <textarea
              id="description_en"
              name="description_en"
              value={formData.description_en}
              onChange={onInputChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter event description in English"
              required
            ></textarea>
          </div>

          {/* Event Description Arabic */}
          <div>
            <label
              htmlFor="description_ar"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description (Arabic) *
            </label>
            <textarea
              id="description_ar"
              name="description_ar"
              value={formData.description_ar}
              onChange={onInputChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="أدخل وصف الحدث بالعربية"
              required
            ></textarea>
          </div>

          {/* Event Date */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Event Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date || ""}
              onChange={onInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          {/* Event Start Time */}
          <div>
            <label
              htmlFor="start_time"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Start Time
            </label>
            <input
              type="time"
              id="start_time"
              name="start_time"
              value={formData.start_time || ""}
              onChange={onInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          {/* Event End Time */}
          <div>
            <label
              htmlFor="end_time"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              End Time
            </label>
            <input
              type="time"
              id="end_time"
              name="end_time"
              value={formData.end_time || ""}
              onChange={onInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Event Image {!isEditing && "*"}
            </label>
            <div className="space-y-2">
              <input
                type="file"
                id="image"
                name="image"
                onChange={onImageChange}
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={!isEditing}
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
                    <p className="text-gray-500">Image preview will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (isEditing ? "Updating..." : "Adding...") : isEditing ? "Update Event" : "Add Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
