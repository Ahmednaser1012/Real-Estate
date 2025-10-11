import React, { useState, useMemo } from "react";
import { BiBuildings } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import AdminCard from "../../ui/AdminCard";
import AdminButton from "../../ui/AdminButton";
import {
  PropertyFilter,
  PropertyGrid,
  PropertyDetailsModal,
  PropertyFormModal,
  DeleteConfirmModal,
} from "./components";

// Dummy data for demonstration - Replace with API call
const initialProperties = [
  {
    id: 1,
    type: "apartments",
    image: "/images/property (1).jpg",
    area_min: 100,
    area_max: 150,
    price_min: 2000000,
    price_max: 2500000,
    no_of_bedrooms_min: 2,
    no_of_bedrooms_max: 3,
    no_of_bathrooms_min: 1,
    no_of_bathrooms_max: 2,
    status: "available",
    deliveryDate: "2024-12-31",
  },
  {
    id: 2,
    type: "offices",
    image: "/images/property (2).jpg",
    area_min: 80,
    area_max: 120,
    price_min: 1500000,
    price_max: 2000000,
    no_of_bedrooms_min: 0,
    no_of_bedrooms_max: 0,
    no_of_bathrooms_min: 1,
    no_of_bathrooms_max: 2,
    status: "available",
    deliveryDate: "2024-12-15",
  },
  {
    id: 3,
    type: "retails",
    image: "/images/property (3).jpg",
    area_min: 50,
    area_max: 100,
    price_min: 2500000,
    price_max: 3500000,
    no_of_bedrooms_min: 0,
    no_of_bedrooms_max: 0,
    no_of_bathrooms_min: 1,
    no_of_bathrooms_max: 1,
    status: "available",
    deliveryDate: "2025-01-20",
  },
  {
    id: 4,
    type: "duplexes",
    image: "/images/property (4).jpg",
    area_min: 200,
    area_max: 300,
    price_min: 3500000,
    price_max: 5000000,
    no_of_bedrooms_min: 3,
    no_of_bedrooms_max: 5,
    no_of_bathrooms_min: 2,
    no_of_bathrooms_max: 4,
    status: "reserved",
    deliveryDate: "2025-03-10",
  },
  {
    id: 5,
    type: "studios",
    image: "/images/property (5).jpg",
    area_min: 40,
    area_max: 70,
    price_min: 1000000,
    price_max: 1500000,
    no_of_bedrooms_min: 0,
    no_of_bedrooms_max: 1,
    no_of_bathrooms_min: 1,
    no_of_bathrooms_max: 1,
    status: "available",
    deliveryDate: "2024-11-30",
  },
  {
    id: 6,
    type: "clinics",
    image: "/images/property (6).jpg",
    area_min: 60,
    area_max: 100,
    price_min: 1800000,
    price_max: 2500000,
    no_of_bedrooms_min: 0,
    no_of_bedrooms_max: 0,
    no_of_bathrooms_min: 1,
    no_of_bathrooms_max: 2,
    status: "sold",
    deliveryDate: "2025-02-28",
  },
];

const PropertiesTab = () => {
  const [properties, setProperties] = useState(initialProperties);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [propertyToEdit, setPropertyToEdit] = useState(null);
  const [propertyToDelete, setPropertyToDelete] = useState(null);

  // Filter properties based on active filter
  const filteredProperties = useMemo(() => {
    if (activeFilter === "all") {
      return properties;
    }
    return properties.filter((property) => property.type === activeFilter);
  }, [properties, activeFilter]);

  // Handle view property details
  const handleViewProperty = (property) => {
    setSelectedProperty(property);
    setIsDetailsModalOpen(true);
  };

  // Handle add new property
  const handleAddProperty = () => {
    setPropertyToEdit(null);
    setIsFormModalOpen(true);
  };

  // Handle edit property
  const handleEditProperty = (property) => {
    setPropertyToEdit(property);
    setIsFormModalOpen(true);
  };

  // Handle delete property
  const handleDeleteProperty = (property) => {
    setPropertyToDelete(property);
    setIsDeleteModalOpen(true);
  };

  // Handle save property (add or edit)
  const handleSaveProperty = (propertyData) => {
    if (propertyToEdit) {
      // Update existing property
      setProperties((prev) =>
        prev.map((p) =>
          p.id === propertyToEdit.id ? { ...propertyData, id: p.id } : p
        )
      );
    } else {
      // Add new property
      const newProperty = {
        ...propertyData,
        id: Math.max(...properties.map((p) => p.id), 0) + 1,
      };
      setProperties((prev) => [...prev, newProperty]);
    }
  };

  // Confirm delete property
  const confirmDeleteProperty = () => {
    setProperties((prev) => prev.filter((p) => p.id !== propertyToDelete.id));
    setIsDeleteModalOpen(false);
    setPropertyToDelete(null);
  };

  return (
    <>
      <AdminCard
        title="Properties Management"
        subtitle={`Total Properties: ${properties.length}`}
        icon={BiBuildings}
        headerActions={
          <AdminButton
            variant="primary"
            size="sm"
            icon={FaPlus}
            onClick={handleAddProperty}
          >
            Add New Property
          </AdminButton>
        }
      >
        {/* Filter Buttons */}
        <PropertyFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Properties Grid */}
        <PropertyGrid
          properties={filteredProperties}
          onView={handleViewProperty}
          onEdit={handleEditProperty}
          onDelete={handleDeleteProperty}
        />
      </AdminCard>

      {/* Property Details Modal */}
      <PropertyDetailsModal
        property={selectedProperty}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onEdit={handleEditProperty}
        onDelete={handleDeleteProperty}
      />

      {/* Property Form Modal (Add/Edit) */}
      <PropertyFormModal
        property={propertyToEdit}
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setPropertyToEdit(null);
        }}
        onSave={handleSaveProperty}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setPropertyToDelete(null);
        }}
        onConfirm={confirmDeleteProperty}
        propertyTitle={propertyToDelete?.type ? 
          propertyToDelete.type.charAt(0).toUpperCase() + propertyToDelete.type.slice(1) : 
          "this property"}
      />
    </>
  );
};

export default PropertiesTab;
