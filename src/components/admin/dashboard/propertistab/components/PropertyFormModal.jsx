import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import AdminButton from "../../../ui/AdminButton";
import { useGetAllProjectsQuery } from "../../../../../features/projectsApi";

const PropertyFormModal = ({ property, isOpen, onClose, onSave }) => {
  const { t, i18n } = useTranslation();
  const { data: projectsResponse = {} } = useGetAllProjectsQuery(undefined, { skip: !isOpen });

  // Extract projects array from response (handle both array and object responses)
  const projects = Array.isArray(projectsResponse) 
    ? projectsResponse 
    : (projectsResponse?.data || []);

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
    
    if (!formData.type) newErrors.type = t("validation.propertyTypeRequired");
    if (!formData.projectId) newErrors.projectId = t("validation.projectRequired");
    if (!property && !formData.image) newErrors.image = t("validation.imageRequired");
    if (!formData.area_min) newErrors.area_min = t("validation.minimumAreaRequired");
    if (!formData.area_max) newErrors.area_max = t("validation.maximumAreaRequired");
    if (!formData.price_min) newErrors.price_min = t("validation.minimumPriceRequired");
    if (!formData.price_max) newErrors.price_max = t("validation.maximumPriceRequired");
    
    // Validate min/max ranges
    if (formData.area_min && formData.area_max && parseFloat(formData.area_min) > parseFloat(formData.area_max)) {
      newErrors.area_max = t("validation.maximumAreaGreater");
    }
    if (formData.price_min && formData.price_max && parseFloat(formData.price_min) > parseFloat(formData.price_max)) {
      newErrors.price_max = t("validation.maximumPriceGreater");
    }
    if (formData.no_of_bedrooms_min && formData.no_of_bedrooms_max && parseInt(formData.no_of_bedrooms_min) > parseInt(formData.no_of_bedrooms_max)) {
      newErrors.no_of_bedrooms_max = t("validation.maximumBedroomsGreater");
    }
    if (formData.no_of_bathrooms_min && formData.no_of_bathrooms_max && parseInt(formData.no_of_bathrooms_min) > parseInt(formData.no_of_bathrooms_max)) {
      newErrors.no_of_bathrooms_max = t("validation.maximumBathroomsGreater");
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
                {property ? t("properties.editProperty") : t("properties.addNewProperty")}
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
                    {t("properties.project")} *
                  </label>
                  <select
                    name="projectId"
                    value={formData.projectId}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black ${
                      errors.projectId ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">{t("properties.selectProject")}</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {i18n.language === "ar" ? (project.title_ar || project.title_en || `Project ${project.id}`) : (project.title_en || project.title_ar || `Project ${project.id}`)}
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
                    {t("properties.propertyType")} *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black ${
                      errors.type ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                        <option value="apartments">{t("enums.propertyTypes.apartments")}</option>
                        <option value="duplexes">{t("enums.propertyTypes.duplexes")}</option>
                        <option value="studios">{t("enums.propertyTypes.studios")}</option>
                        <option value="offices">{t("enums.propertyTypes.offices")}</option>
                        <option value="clinics">{t("enums.propertyTypes.clinics")}</option>
                        <option value="retails">{t("enums.propertyTypes.retails")}</option>
                  </select>
                  {errors.type && (
                    <p className="text-red-500 text-sm mt-1">{errors.type}</p>
                  )}
                </div>

                {/* Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("properties.propertyImage")} {!property && "*"}
                  </label>
                  {property && property.image && (
                    <div className="mb-2">
                      <img 
                        src={property.image} 
                        alt={t("properties.currentImage")}
                        className="object-cover w-32 h-32 border border-gray-300 rounded-lg"
                      />
                      <p className="mt-1 text-xs text-gray-600">{t("properties.currentImage")}</p>
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
                    <p className="text-gray-500 text-xs mt-1">{t("properties.keepCurrentImage")}</p>
                  )}
                </div>

                {/* Area Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("properties.minimumArea")} *
                    </label>
                    <input
                      type="number"
                      name="area_min"
                      value={formData.area_min}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black ${
                        errors.area_min ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={`${t("properties.example")}: 100`}
                    />
                    {errors.area_min && (
                      <p className="text-red-500 text-sm mt-1">{errors.area_min}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("properties.maximumArea")} *
                    </label>
                    <input
                      type="number"
                      name="area_max"
                      value={formData.area_max}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black ${
                        errors.area_max ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={`${t("properties.example")}: 200`}
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
                      {t("properties.minimumPrice")} *
                    </label>
                    <input
                      type="number"
                      name="price_min"
                      value={formData.price_min}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black ${
                        errors.price_min ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={`${t("properties.example")}: 1500000`}
                    />
                    {errors.price_min && (
                      <p className="text-red-500 text-sm mt-1">{errors.price_min}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("properties.maximumPrice")} *
                    </label>
                    <input
                      type="number"
                      name="price_max"
                      value={formData.price_max}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black ${
                        errors.price_max ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={`${t("properties.example")}: 2500000`}
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
                      {t("properties.minimumBedrooms")}
                    </label>
                    <input
                      type="number"
                      name="no_of_bedrooms_min"
                      value={formData.no_of_bedrooms_min}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black ${
                        errors.no_of_bedrooms_min ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={`${t("properties.example")}: 2`}
                    />
                    {errors.no_of_bedrooms_min && (
                      <p className="text-red-500 text-sm mt-1">{errors.no_of_bedrooms_min}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("properties.maximumBedrooms")}
                    </label>
                    <input
                      type="number"
                      name="no_of_bedrooms_max"
                      value={formData.no_of_bedrooms_max}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black ${
                        errors.no_of_bedrooms_max ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={`${t("properties.example")}: 4`}
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
                      {t("properties.minimumBathrooms")}
                    </label>
                    <input
                      type="number"
                      name="no_of_bathrooms_min"
                      value={formData.no_of_bathrooms_min}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black ${
                        errors.no_of_bathrooms_min ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={`${t("properties.example")}: 1`}
                    />
                    {errors.no_of_bathrooms_min && (
                      <p className="text-red-500 text-sm mt-1">{errors.no_of_bathrooms_min}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("properties.maximumBathrooms")}
                    </label>
                    <input
                      type="number"
                      name="no_of_bathrooms_max"
                      value={formData.no_of_bathrooms_max}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black ${
                        errors.no_of_bathrooms_max ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={`${t("properties.example")}: 3`}
                    />
                    {errors.no_of_bathrooms_max && (
                      <p className="text-red-500 text-sm mt-1">{errors.no_of_bathrooms_max}</p>
                    )}
                  </div>
                </div>

                              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-gray-200 sm:flex-row">
                <AdminButton
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={onClose}
                  className="flex-1 w-full sm:w-auto"
                >
                  {t("common.cancel")}
                </AdminButton>
                <AdminButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  className="flex-1 w-full sm:w-auto"
                >
                  {property ? t("common.save") : t("properties.addNewProperty")}
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
