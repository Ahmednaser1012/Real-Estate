import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import AdminButton from "../../../ui/AdminButton";
import { useGetAllProjectsQuery } from "../../../../../features/projectsApi";

const PropertyFormModal = ({ property, isOpen, onClose, onSave }) => {
  const { data: projects = [] } = useGetAllProjectsQuery(undefined, { skip: !isOpen });

  const [formData, setFormData] = useState({
    type: "apartments",
    projectId: "",
    image: null,
    area_min: "",
    area_max: "",
    price_min: "",
    price_max: "",
    no_of_bedrooms_min: "",
    no_of_bedrooms_max: "",
    no_of_bathrooms_min: "",
    no_of_bathrooms_max: "",
    deliveryDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (property) {
      setFormData({
        type: property.type || "apartments",
        projectId: property.projectId || "",
        image: null,
        area_min: property.areaMin || "",
        area_max: property.areaMax || "",
        price_min: property.priceMin || "",
        price_max: property.priceMax || "",
        no_of_bedrooms_min: property.noOfBedroomsMin || "",
        no_of_bedrooms_max: property.noOfBedroomsMax || "",
        no_of_bathrooms_min: property.noOfBathroomsMin || "",
        no_of_bathrooms_max: property.noOfBathroomsMax || "",
        deliveryDate: property.deliveryDate || "",
      });
    } else {
      setFormData({
        type: "apartments",
        projectId: "",
        image: null,
        area_min: "",
        area_max: "",
        price_min: "",
        price_max: "",
        no_of_bedrooms_min: "",
        no_of_bedrooms_max: "",
        no_of_bathrooms_min: "",
        no_of_bathrooms_max: "",
        deliveryDate: "",
      });
    }
    setErrors({});
  }, [property, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files?.[0]) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
      if (errors.image) {
        setErrors((prev) => ({ ...prev, image: "" }));
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.type) newErrors.type = "Property type is required";
    if (!formData.projectId) newErrors.projectId = "Project is required";
    if (!property && !formData.image) newErrors.image = "Image is required";
    if (!formData.area_min) newErrors.area_min = "Minimum area is required";
    if (!formData.area_max) newErrors.area_max = "Maximum area is required";
    if (!formData.price_min) newErrors.price_min = "Minimum price is required";
    if (!formData.price_max) newErrors.price_max = "Maximum price is required";
    
    // Validate min/max ranges
    if (formData.area_min && formData.area_max && parseFloat(formData.area_min) > parseFloat(formData.area_max)) {
      newErrors.area_max = "Maximum area must be greater than minimum area";
    }
    if (formData.price_min && formData.price_max && parseFloat(formData.price_min) > parseFloat(formData.price_max)) {
      newErrors.price_max = "Maximum price must be greater than minimum price";
    }
    if (formData.no_of_bedrooms_min && formData.no_of_bedrooms_max && parseInt(formData.no_of_bedrooms_min) > parseInt(formData.no_of_bedrooms_max)) {
      newErrors.no_of_bedrooms_max = "Maximum bedrooms must be greater than minimum bedrooms";
    }
    if (formData.no_of_bathrooms_min && formData.no_of_bathrooms_max && parseInt(formData.no_of_bathrooms_min) > parseInt(formData.no_of_bathrooms_max)) {
      newErrors.no_of_bathrooms_max = "Maximum bathrooms must be greater than minimum bathrooms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);

    try {
      const submitData = new FormData();
      
      submitData.append('type', formData.type);
      submitData.append('projectId', formData.projectId);
      if (formData.image) {
        submitData.append('image', formData.image);
      }
      submitData.append('areaMin', formData.area_min);
      submitData.append('areaMax', formData.area_max);
      submitData.append('priceMin', formData.price_min);
      submitData.append('priceMax', formData.price_max);
      submitData.append('noOfBedroomsMin', formData.no_of_bedrooms_min || 0);
      submitData.append('noOfBedroomsMax', formData.no_of_bedrooms_max || 0);
      submitData.append('noOfBathroomsMin', formData.no_of_bathrooms_min || 0);
      submitData.append('noOfBathroomsMax', formData.no_of_bathrooms_max || 0);
      submitData.append('deliveryDate', formData.deliveryDate);

      await onSave(submitData);
      onClose();
    } catch (error) {
      setErrors({ submit: "Failed to save property type. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-gray-800">
                {property ? "Edit Property Type" : "Add New Property Type"}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes className="text-gray-600 text-xl" />
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
                {/* Project Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project *
                  </label>
                  <select
                    name="projectId"
                    value={formData.projectId}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black ${
                      errors.projectId ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Project</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.title}
                      </option>
                    ))}
                  </select>
                  {errors.projectId && (
                    <p className="text-red-500 text-sm mt-1">{errors.projectId}</p>
                  )}
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black ${
                      errors.type ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="apartments">Apartments</option>
                    <option value="duplexes">Duplexes</option>
                    <option value="studios">Studios</option>
                    <option value="offices">Offices</option>
                    <option value="clinics">Clinics</option>
                    <option value="retails">Retails</option>
                  </select>
                  {errors.type && (
                    <p className="text-red-500 text-sm mt-1">{errors.type}</p>
                  )}
                </div>

                {/* Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Image {!property && "*"}
                  </label>
                  {property && property.image && (
                    <div className="mb-2">
                      <img 
                        src={property.image} 
                        alt="Current Property" 
                        className="object-cover w-32 h-32 border border-gray-300 rounded-lg"
                      />
                      <p className="mt-1 text-xs text-gray-600">Current Image</p>
                    </div>
                  )}
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
                  {property && (
                    <p className="text-gray-500 text-xs mt-1">Leave empty to keep current image</p>
                  )}
                </div>

                {/* Area Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Area (m²) *
                    </label>
                    <input
                      type="number"
                      name="area_min"
                      value={formData.area_min}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black ${
                        errors.area_min ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Example: 100"
                    />
                    {errors.area_min && (
                      <p className="text-red-500 text-sm mt-1">{errors.area_min}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum Area (m²) *
                    </label>
                    <input
                      type="number"
                      name="area_max"
                      value={formData.area_max}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black ${
                        errors.area_max ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Example: 200"
                    />
                    {errors.area_max && (
                      <p className="text-red-500 text-sm mt-1">{errors.area_max}</p>
                    )}
                  </div>
                </div>

                {/* Price Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Price (EGP) *
                    </label>
                    <input
                      type="number"
                      name="price_min"
                      value={formData.price_min}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black ${
                        errors.price_min ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Example: 1500000"
                    />
                    {errors.price_min && (
                      <p className="text-red-500 text-sm mt-1">{errors.price_min}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum Price (EGP) *
                    </label>
                    <input
                      type="number"
                      name="price_max"
                      value={formData.price_max}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black ${
                        errors.price_max ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Example: 2500000"
                    />
                    {errors.price_max && (
                      <p className="text-red-500 text-sm mt-1">{errors.price_max}</p>
                    )}
                  </div>
                </div>

                {/* Bedrooms Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Bedrooms
                    </label>
                    <input
                      type="number"
                      name="no_of_bedrooms_min"
                      value={formData.no_of_bedrooms_min}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black ${
                        errors.no_of_bedrooms_min ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Example: 2"
                    />
                    {errors.no_of_bedrooms_min && (
                      <p className="text-red-500 text-sm mt-1">{errors.no_of_bedrooms_min}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum Bedrooms
                    </label>
                    <input
                      type="number"
                      name="no_of_bedrooms_max"
                      value={formData.no_of_bedrooms_max}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black ${
                        errors.no_of_bedrooms_max ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Example: 4"
                    />
                    {errors.no_of_bedrooms_max && (
                      <p className="text-red-500 text-sm mt-1">{errors.no_of_bedrooms_max}</p>
                    )}
                  </div>
                </div>

                {/* Bathrooms Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Bathrooms
                    </label>
                    <input
                      type="number"
                      name="no_of_bathrooms_min"
                      value={formData.no_of_bathrooms_min}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black ${
                        errors.no_of_bathrooms_min ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Example: 1"
                    />
                    {errors.no_of_bathrooms_min && (
                      <p className="text-red-500 text-sm mt-1">{errors.no_of_bathrooms_min}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum Bathrooms
                    </label>
                    <input
                      type="number"
                      name="no_of_bathrooms_max"
                      value={formData.no_of_bathrooms_max}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black ${
                        errors.no_of_bathrooms_max ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Example: 3"
                    />
                    {errors.no_of_bathrooms_max && (
                      <p className="text-red-500 text-sm mt-1">{errors.no_of_bathrooms_max}</p>
                    )}
                  </div>
                </div>

                {/* Delivery Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Date
                  </label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black ${
                      errors.deliveryDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.deliveryDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.deliveryDate}</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                <AdminButton
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </AdminButton>
                <AdminButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  className="flex-1"
                >
                  {property ? "Save Changes" : "Add Property Type"}
                </AdminButton>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PropertyFormModal;
