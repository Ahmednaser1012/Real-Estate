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
    title: "Luxury Apartment in New Cairo",
    type: "apartment",
    subType: "",
    price: 2500000,
    location: "New Cairo, Cairo",
    status: "available",
    image: "/images/property (1).jpg",
    bedrooms: 3,
    bathrooms: 2,
    deliveryDate: "Immediate",
    area: 150,
    description: "Luxury apartment with super lux finishing in a prime location",
    features: ["Parking", "Garden", "24/7 Security"],
  },
  {
    id: 2,
    title: "Administrative Office Downtown",
    type: "office",
    price: 1800000,
    location: "Downtown, Cairo",
    status: "reserved",
    image: "/images/property (2).jpg",
    deliveryDate: "December 2024",
    area: 100,
    description: "Administrative office in a modern commercial tower",
    features: ["Elevator", "Reception", "High-speed Internet"],
  },
  {
    id: 3,
    title: "Commercial Shop in Maadi",
    type: "shop",
    price: 3200000,
    location: "Maadi, Cairo",
    status: "available",
    image: "/images/property (3).jpg",
    deliveryDate: "January 2025",
    area: 80,
    description: "Commercial shop on a main street",
    features: ["Glass Facade", "Air Conditioning", "Bathroom"],
  },
  {
    id: 4,
    title: "Modern Apartment in Nasr City",
    type: "apartment",
    subType: "",
    price: 1900000,
    location: "Nasr City, Cairo",
    status: "sold",
    image: "/images/property (4).jpg",
    bedrooms: 2,
    bathrooms: 1,
    deliveryDate: "Immediate",
    area: 120,
    description: "Modern apartment with contemporary design",
    features: ["Balcony", "Equipped Kitchen"],
  },
  {
    id: 5,
    title: "Luxury Office in Sheikh Zayed",
    type: "office",
    price: 2200000,
    location: "Sheikh Zayed, Giza",
    status: "available",
    image: "/images/property (5).jpg",
    deliveryDate: "March 2025",
    area: 120,
    description: "Luxury office in a commercial mall",
    features: ["Private Parking", "Central AC"],
  },
  {
    id: 6,
    title: "Commercial Shop in Heliopolis",
    type: "shop",
    price: 2800000,
    location: "Heliopolis, Cairo",
    status: "reserved",
    image: "/images/property (6).jpg",
    deliveryDate: "February 2025",
    area: 60,
    description: "Shop in a vibrant area",
    features: ["Double Facade", "Storage"],
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
        propertyTitle={propertyToDelete?.title}
      />
    </>
  );
};

export default PropertiesTab;
