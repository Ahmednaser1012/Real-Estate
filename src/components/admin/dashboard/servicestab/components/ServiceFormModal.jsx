import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import AdminButton from "../../../ui/AdminButton";

const ServiceFormModal = ({ service, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (service) {
        setFormData({
          name_en: service.name_en || "",
          name_ar: service.name_ar || "",
          image: null,
        });
        setImagePreview(service.image || null);
      } else {
        resetForm();
      }
    }
  }, [isOpen, service]);

  const resetForm = () => {
    setFormData({
      name_en: "",
      name_ar: "",
      image: null,
    });
    setImagePreview(null);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
      // Clear image error if exists
      if (errors.image) {
        setErrors((prev) => ({ ...prev, image: "" }));
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name_en.trim()) newErrors.name_en = "English name is required";
    if (!formData.name_ar.trim()) newErrors.name_ar = "Arabic name is required";
    // Image is required only when adding new service (not editing)
    if (!service && !formData.image && !imagePreview) {
      newErrors.image = "Service image is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if form is valid for enabling/disabling submit button
  const isFormValid = () => {
    const namesValid = formData.name_en.trim() !== "" && formData.name_ar.trim() !== "";
    
    // For new service, image is required
    if (!service) {
      return namesValid && (formData.image || imagePreview);
    }
    
    // For editing, image is optional (can keep existing image)
    return namesValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const submitData = new FormData();
      
      // Always send name_en and name_ar
      submitData.append("name_en", formData.name_en);
      submitData.append("name_ar", formData.name_ar);
      
      // Send image only if a new one was selected
      if (formData.image) {
        submitData.append("image", formData.image);
      }

      await onSave(submitData);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: "Failed to save service. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-800">
            {service ? "Edit Service" : "Add New Service"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {errors.submit}
            </div>
          )}

          <div className="space-y-4">
            {/* English Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Name (English) *
              </label>
              <input
                type="text"
                name="name_en"
                value={formData.name_en}
                onChange={handleChange}
                placeholder="e.g., Parking"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                  errors.name_en ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name_en && (
                <p className="text-red-500 text-sm mt-1">{errors.name_en}</p>
              )}
            </div>

            {/* Arabic Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Name (Arabic) *
              </label>
              <input
                type="text"
                name="name_ar"
                value={formData.name_ar}
                onChange={handleChange}
                placeholder="مثال: موقف سيارات"
                dir="rtl"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                  errors.name_ar ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name_ar && (
                <p className="text-red-500 text-sm mt-1">{errors.name_ar}</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Image {!service && "*"}
                {service && <span className="text-gray-500 text-xs ml-2">(Optional - leave empty to keep current image)</span>}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.image ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image}</p>
              )}
              {imagePreview && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">
                    {service ? "Current Image:" : "Preview:"}
                  </p>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-3 justify-end mt-6 pt-6 border-t border-gray-200">
            <AdminButton
              type="button"
              variant="outline"
              size="md"
              onClick={onClose}
            >
              Cancel
            </AdminButton>
            <AdminButton
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              disabled={!isFormValid() || loading}
            >
              {service ? "Save Changes" : "Add Service"}
            </AdminButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceFormModal;
