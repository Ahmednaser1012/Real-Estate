import React from "react";
import { motion } from "framer-motion";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCalendarAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";

const PropertyCard = ({ property, onView, onEdit, onDelete }) => {
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
      apartments: "Apartments",
      duplexes: "Duplexes",
      studios: "Studios",
      offices: "Offices",
      clinics: "Clinics",
      retails: "Retails",
    };
    return labels[type] || type;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
      onClick={() => onView(property)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.image || "/images/property (1).jpg"}
          alt={getTypeLabel(property.type)}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        {/* <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
              property.status
            )}`}
          >
            {getStatusText(property.status)}
          </span>
        </div> */}
        <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {getTypeLabel(property.type)}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-3">
          {getTypeLabel(property.type)}
        </h3>

        {/* Price Range */}
        <div className="flex items-center gap-2 text-sm mb-3 bg-green-50 p-2 rounded-lg">
          <FaMoneyBillWave className="text-green-600" />
          <span className="font-semibold text-green-700">
            {property.priceMin?.toLocaleString()} -{" "}
            {property.priceMax?.toLocaleString()} EGP
          </span>
        </div>

        {/* Area Range */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <FaRulerCombined className="text-blue-600" />
          <span>
            {property.areaMin} - {property.areaMax} m²
          </span>
        </div>

        {/* Bedrooms & Bathrooms */}
        {(property.noOfBedroomsMin > 0 || property.noOfBedroomsMax > 0) && (
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaBed className="text-purple-600" />
              <span>
                {property.noOfBedroomsMin} - {property.noOfBedroomsMax} Beds
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaBath className="text-cyan-600" />
              <span>
                {property.noOfBathroomsMin} - {property.noOfBathroomsMax} Baths
              </span>
            </div>
          </div>
        )}

        {/* Delivery Date */}
        {property.deliveryDate && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <FaCalendarAlt className="text-orange-600" />
            <span>
              {new Date(property.deliveryDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(property);
            }}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <MdEdit />
            <span className="text-sm font-medium">Edit</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(property);
            }}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            <MdDelete />
            <span className="text-sm font-medium">Delete</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
