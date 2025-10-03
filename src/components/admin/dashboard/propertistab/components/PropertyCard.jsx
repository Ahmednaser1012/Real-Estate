import React from "react";
import { motion } from "framer-motion";
import { FaBed, FaBath, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
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

  const getSubTypeText = (subType) => {
    switch (subType) {
      case "townhouse":
        return "Townhouse";
      case "twin":
        return "Twin House";
      case "villa":
        return "Standalone Villa";
      default:
        return "";
    }
  };

  const renderPropertyDetails = () => {
    switch (property.type) {
      case "apartment":
        return (
          <>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaBed className="text-primary" />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaBath className="text-primary" />
              <span>{property.bathrooms} Baths</span>
            </div>
            {property.deliveryDate && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaCalendarAlt className="text-primary" />
                <span>{property.deliveryDate}</span>
              </div>
            )}
          </>
        );
      case "office":
      case "shop":
        return (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaCalendarAlt className="text-primary" />
            <span>Delivery: {property.deliveryDate}</span>
          </div>
        );
      default:
        return null;
    }
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
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
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
        {property.subType && (
          <div className="absolute top-3 left-3 bg-secondary text-white px-3 py-1 rounded-full text-xs font-semibold">
            {getSubTypeText(property.subType)}
          </div>
        )}
        <div className="absolute bottom-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
          {property.price.toLocaleString()} EGP
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
          {property.title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <FaMapMarkerAlt className="text-primary" />
          <span className="truncate">{property.location}</span>
        </div>

        <div className="flex items-center gap-4 mb-4">{renderPropertyDetails()}</div>

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
