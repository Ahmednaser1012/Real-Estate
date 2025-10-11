import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import AdminButton from "../../../ui/AdminButton";

const CityFormModal = ({ city, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (city) {
        setFormData({
          name_en: city.name_en || "",
          name_ar: city.name_ar || "",
        });
      } else {
        resetForm();
      }
    }
  }, [isOpen, city]);

  const resetForm = () => {
    setFormData({
      name_en: "",
      name_ar: "",
    });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name_en.trim()) newErrors.name_en = "English name is required";
    if (!formData.name_ar.trim()) newErrors.name_ar = "Arabic name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: "Failed to save city. Please try again." });
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
            {city ? "Edit City" : "Add New City"}
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
                City Name (English) *
              </label>
              <input
                type="text"
                name="name_en"
                value={formData.name_en}
                onChange={handleChange}
                placeholder="e.g., Cairo"
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
                City Name (Arabic) *
              </label>
              <input
                type="text"
                name="name_ar"
                value={formData.name_ar}
                onChange={handleChange}
                placeholder="مثال: القاهرة"
                dir="rtl"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                  errors.name_ar ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name_ar && (
                <p className="text-red-500 text-sm mt-1">{errors.name_ar}</p>
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
            >
              {city ? "Save Changes" : "Add City"}
            </AdminButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CityFormModal;
