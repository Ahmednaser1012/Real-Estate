import { motion, AnimatePresence } from "framer-motion";
import {
  FaBed,
  FaBath,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTimes,
  FaRulerCombined,
} from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import AdminButton from "../../../ui/AdminButton";

const PropertyDetailsModal = ({
  property,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  if (!property) return null;

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

  const getTypeText = (type) => {
    switch (type) {
      case "apartment":
        return "Apartment";
      case "office":
        return "Office";
      case "shop":
        return "Shop";
      default:
        return type;
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
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <FaBed className="text-primary text-2xl" />
              <div>
                <p className="text-sm text-gray-600">Bedrooms</p>
                <p className="text-lg font-bold text-gray-800">
                  {property.bedrooms}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <FaBath className="text-primary text-2xl" />
              <div>
                <p className="text-sm text-gray-600">Bathrooms</p>
                <p className="text-lg font-bold text-gray-800">
                  {property.bathrooms}
                </p>
              </div>
            </div>
            {property.deliveryDate && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <FaCalendarAlt className="text-primary text-2xl" />
                <div>
                  <p className="text-sm text-gray-600">Delivery Date</p>
                  <p className="text-lg font-bold text-gray-800">
                    {property.deliveryDate}
                  </p>
                </div>
              </div>
            )}
            {property.area && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <FaRulerCombined className="text-primary text-2xl" />
                <div>
                  <p className="text-sm text-gray-600">Area</p>
                  <p className="text-lg font-bold text-gray-800">
                    {property.area} m²
                  </p>
                </div>
              </div>
            )}
          </>
        );
      case "office":
      case "shop":
        return (
          <>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <FaCalendarAlt className="text-primary text-2xl" />
              <div>
                <p className="text-sm text-gray-600">Delivery Date</p>
                <p className="text-lg font-bold text-gray-800">
                  {property.deliveryDate}
                </p>
              </div>
            </div>
            {property.area && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <FaRulerCombined className="text-primary text-2xl" />
                <div>
                  <p className="text-sm text-gray-600">Area</p>
                  <p className="text-lg font-bold text-gray-800">
                    {property.area} m²
                  </p>
                </div>
              </div>
            )}
          </>
        );
      default:
        return null;
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
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {property.title}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      property.status
                    )}`}
                  >
                    {getStatusText(property.status)}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                    {getTypeText(property.type)}
                  </span>
                  {property.subType && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                      {getSubTypeText(property.subType)}
                    </span>
                  )}
                </div>
              </div>
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
              <div className="relative h-96 rounded-xl overflow-hidden mb-6">
                <img
                  src={property.image || "/images/property (1).jpg"}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-primary text-white px-4 py-2 rounded-lg text-xl font-bold shadow-lg">
                  {property.price.toLocaleString()} EGP
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg mb-6">
                <FaMapMarkerAlt className="text-primary text-2xl" />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="text-lg font-bold text-gray-800">
                    {property.location}
                  </p>
                </div>
              </div>

              {/* Property Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {renderPropertyDetails()}
              </div>

              {/* Description */}
              {property.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {property.description}
                  </p>
                </div>
              )}

              {/* Additional Info */}
              {property.features && property.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    Features
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {property.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <AdminButton
                  variant="primary"
                  size="lg"
                  icon={MdEdit}
                  onClick={() => {
                    onEdit(property);
                    onClose();
                  }}
                  className="flex-1"
                >
                  Edit Property
                </AdminButton>
                <AdminButton
                  variant="danger"
                  size="lg"
                  icon={MdDelete}
                  onClick={() => {
                    onDelete(property);
                    onClose();
                  }}
                  className="flex-1"
                >
                  Delete Property
                </AdminButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PropertyDetailsModal;
