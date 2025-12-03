import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaEdit, FaTrash, FaBed, FaBath, FaRulerCombined, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";

const PropertyDetailsModal = ({ property, isOpen, onClose, onEdit, onDelete }) => {
  const { t, i18n } = useTranslation();

  if (!property) return null;

  // Debug: Check delivery date
  console.log('Property in Details Modal:', property);
  console.log('Delivery Date:', property.deliveryDate);

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "reserved":
        return "bg-yellow-100 text-yellow-800";
      case "sold":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "available":
        return "Available";
      case "reserved":
        return "Reserved";
      case "sold":
        return "Sold";
      default:
        return status;
    }
  };

  const getTypeLabel = (type) => {
    const labels = {
      apartments: t("enums.propertyTypes.apartments"),
      duplexes: t("enums.propertyTypes.duplexes"),
      studios: t("enums.propertyTypes.studios"),
      offices: t("enums.propertyTypes.offices"),
      clinics: t("enums.propertyTypes.clinics"),
      retails: t("enums.propertyTypes.retails"),
    };
    return labels[type] || type;
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
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-gray-800">{t("properties.propertyDetails")}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes className="text-gray-600 text-xl" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Image */}
              <div className="relative h-64 rounded-lg overflow-hidden mb-6">
                <img
                  src={property.image || "/images/property (1).jpg"}
                  alt={getTypeLabel(property.type)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      property.status
                    )}`}
                  >
                    {getStatusText(property.status)}
                  </span>
                </div>
                <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {getTypeLabel(property.type)}
                </div>
              </div>

              {/* Property Type */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {getTypeLabel(property.type)}
                </h3>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Price Range */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FaMoneyBillWave className="text-green-600 text-xl" />
                    <h4 className="font-semibold text-gray-700">{t("properties.priceRange")}</h4>
                  </div>
                  <p className="text-lg font-bold text-green-700">
                    {property.priceMin?.toLocaleString()} - {property.priceMax?.toLocaleString()} {t("properties.currency")}
                  </p>
                </div>

                {/* Area Range */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FaRulerCombined className="text-blue-600 text-xl" />
                    <h4 className="font-semibold text-gray-700">{t("properties.areaRange")}</h4>
                  </div>
                  <p className="text-lg font-bold text-blue-700">
                    {property.areaMin} - {property.areaMax} m²
                  </p>
                </div>

                {/* Bedrooms */}
                {(property.noOfBedroomsMin > 0 || property.noOfBedroomsMax > 0) && (
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FaBed className="text-purple-600 text-xl" />
                      <h4 className="font-semibold text-gray-700">{t("property.bedrooms")}</h4>
                    </div>
                    <p className="text-lg font-bold text-purple-700">
                      {property.noOfBedroomsMin} - {property.noOfBedroomsMax}
                    </p>
                  </div>
                )}

                {/* Bathrooms */}
                {(property.noOfBathroomsMin > 0 || property.noOfBathroomsMax > 0) && (
                  <div className="bg-cyan-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FaBath className="text-cyan-600 text-xl" />
                      <h4 className="font-semibold text-gray-700">{t("property.bathrooms")}</h4>
                    </div>
                    <p className="text-lg font-bold text-cyan-700">
                      {property.noOfBathroomsMin} - {property.noOfBathroomsMax}
                    </p>
                  </div>
                )}

                {/* Delivery Date */}
                {property.deliveryDate && (
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FaCalendarAlt className="text-orange-600 text-xl" />
                      <h4 className="font-semibold text-gray-700">{t("properties.deliveryDate")}</h4>
                    </div>
                    <p className="text-lg font-bold text-orange-700">
                      {new Date(property.deliveryDate).toLocaleDateString(i18n.language === "ar" ? "ar-EG" : "en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-gray-50 p-6 flex gap-3 border-t border-gray-200">
              <button
                onClick={() => {
                  onEdit(property);
                  onClose();
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <FaEdit />
                {t("properties.editProperty")}
              </button>
              <button
                onClick={() => {
                  onDelete(property);
                  onClose();
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                <FaTrash />
                {t("properties.deleteProperty")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PropertyDetailsModal;
