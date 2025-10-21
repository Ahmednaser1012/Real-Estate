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
import {
  useGetAllPropertiesQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} from "../../../../features/propertiesApi";

const PropertiesTab = () => {
  // API hooks
  const {
    data: apiResponse = [],
    isLoading,
    error,
  } = useGetAllPropertiesQuery();
  const [createProperty] = useCreatePropertyMutation();
  const [updateProperty] = useUpdatePropertyMutation();
  const [deleteProperty] = useDeletePropertyMutation();

  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [propertyToEdit, setPropertyToEdit] = useState(null);
  const [propertyToDelete, setPropertyToDelete] = useState(null);

  // Handle both array and object responses
  const properties = Array.isArray(apiResponse) ? apiResponse : (apiResponse?.data || []);

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
  const handleSaveProperty = async (propertyData) => {
    try {
      if (propertyToEdit) {
        // Update existing property - append id to FormData
        const payload = { id: propertyToEdit.id, formData: propertyData };
        await updateProperty(payload).unwrap();
      } else {
        // Add new property
        await createProperty(propertyData).unwrap();
      }
    } catch (error) {
      console.error("Failed to save property:", error);
      throw error;
    }
  };

  // Confirm delete property
  const confirmDeleteProperty = async () => {
    try {
      await deleteProperty(propertyToDelete.id).unwrap();
      setIsDeleteModalOpen(false);
      setPropertyToDelete(null);
    } catch (error) {
      console.error("Failed to delete property:", error);
    }
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
        propertyTitle={
          propertyToDelete?.type
            ? propertyToDelete.type.charAt(0).toUpperCase() +
              propertyToDelete.type.slice(1)
            : "this property"
        }
      />
    </>
  );
};

export default PropertiesTab;
