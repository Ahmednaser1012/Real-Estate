import React, { useState } from "react";
import { MdMiscellaneousServices } from "react-icons/md";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import AdminCard from "../../ui/AdminCard";
import AdminButton from "../../ui/AdminButton";
import ServiceFormModal from "./components/ServiceFormModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import {
  useGetAllServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} from "../../../../features/servicesApi";

const ServicesTab = () => {
  // RTK Query hooks
  const { data: services = [], isLoading } = useGetAllServicesQuery();
  const [createService] = useCreateServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();

  // State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState(null);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  // Handle add new service
  const handleAddService = () => {
    setServiceToEdit(null);
    setIsFormModalOpen(true);
  };

  // Handle edit service
  const handleEditService = (service) => {
    setServiceToEdit(service);
    setIsFormModalOpen(true);
  };

  // Handle delete service
  const handleDeleteService = (service) => {
    setServiceToDelete(service);
    setIsDeleteModalOpen(true);
  };

  // Handle save service (add or edit)
  const handleSaveService = async (serviceData) => {
    try {
      if (serviceToEdit) {
        // Update existing service
        await updateService({ id: serviceToEdit.id, formData: serviceData }).unwrap();
      } else {
        // Create new service
        await createService(serviceData).unwrap();
      }
      setIsFormModalOpen(false);
      setServiceToEdit(null);
    } catch (error) {
      console.error("Failed to save service:", error);
      throw error;
    }
  };

  // Confirm delete service
  const confirmDeleteService = async () => {
    try {
      await deleteService(serviceToDelete.id).unwrap();
      setIsDeleteModalOpen(false);
      setServiceToDelete(null);
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
  };

  return (
    <>
      <AdminCard
        title="Services Management"
        subtitle={`Total Services: ${services.length}`}
        icon={MdMiscellaneousServices}
        headerActions={
          <AdminButton
            variant="primary"
            size="sm"
            icon={FaPlus}
            onClick={handleAddService}
          >
            Add New Service
          </AdminButton>
        }
      >
        {/* Services Grid */}
        {isLoading ? (
          <div className="text-center py-8">Loading services...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name (English)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name (Arabic)
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {service.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {service.image ? (
                        <img
                          src={service.image}
                          alt={service.name_en}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                          <MdMiscellaneousServices className="text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {service.name_en}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {service.name_ar}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditService(service)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteService(service)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {services.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No services found. Add your first service!
              </div>
            )}
          </div>
        )}
      </AdminCard>

      {/* Service Form Modal (Add/Edit) */}
      <ServiceFormModal
        service={serviceToEdit}
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setServiceToEdit(null);
        }}
        onSave={handleSaveService}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setServiceToDelete(null);
        }}
        onConfirm={confirmDeleteService}
        itemName={serviceToDelete?.name_en}
        itemType="Service"
      />
    </>
  );
};

export default ServicesTab;
