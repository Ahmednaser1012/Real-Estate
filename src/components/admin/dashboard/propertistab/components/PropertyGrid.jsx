import React from "react";
import PropertyCard from "./PropertyCard";
import { motion } from "framer-motion";

const PropertyGrid = ({ properties, onView, onEdit, onDelete }) => {
  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🏢</div>
        <p className="text-gray-500 text-lg">No properties available</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </motion.div>
  );
};

export default PropertyGrid;
