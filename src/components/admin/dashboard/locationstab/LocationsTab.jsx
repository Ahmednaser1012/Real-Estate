import React, { useState } from "react";
import { FaMapMarkerAlt, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import AdminCard from "../../ui/AdminCard";
import AdminButton from "../../ui/AdminButton";
import CityFormModal from "./components/CityFormModal";
import AreaFormModal from "./components/AreaFormModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import {
  useGetAllCitiesQuery,
  useCreateCityMutation,
  useUpdateCityMutation,
  useDeleteCityMutation,
  useGetAllAreasQuery,
  useCreateAreaMutation,
  useUpdateAreaMutation,
  useDeleteAreaMutation,
} from "../../../../features/locationsApi";

const LocationsTab = () => {
  // RTK Query hooks
  const { data: cities = [], isLoading: citiesLoading } = useGetAllCitiesQuery();
  const { data: areas = [], isLoading: areasLoading } = useGetAllAreasQuery();
  const [createCity] = useCreateCityMutation();
  const [updateCity] = useUpdateCityMutation();
  const [deleteCity] = useDeleteCityMutation();
  const [createArea] = useCreateAreaMutation();
  const [updateArea] = useUpdateAreaMutation();
  const [deleteArea] = useDeleteAreaMutation();

  // State
  const [activeTab, setActiveTab] = useState("cities"); // 'cities' or 'areas'
  const [isCityFormModalOpen, setIsCityFormModalOpen] = useState(false);
  const [isAreaFormModalOpen, setIsAreaFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const isLoading = activeTab === "cities" ? citiesLoading : areasLoading;

  // Handle add new city
  const handleAddCity = () => {
    setItemToEdit(null);
    setIsCityFormModalOpen(true);
  };

  // Handle add new area
  const handleAddArea = () => {
    setItemToEdit(null);
    setIsAreaFormModalOpen(true);
  };

  // Handle edit city
  const handleEditCity = (city) => {
    setItemToEdit(city);
    setIsCityFormModalOpen(true);
  };

  // Handle edit area
  const handleEditArea = (area) => {
    setItemToEdit(area);
    setIsAreaFormModalOpen(true);
  };

  // Handle delete city
  const handleDeleteCity = (city) => {
    setItemToDelete({ ...city, type: "city" });
    setIsDeleteModalOpen(true);
  };

  // Handle delete area
  const handleDeleteArea = (area) => {
    setItemToDelete({ ...area, type: "area" });
    setIsDeleteModalOpen(true);
  };

  // Handle save city (add or edit)
  const handleSaveCity = async (cityData) => {
    try {
      if (itemToEdit) {
        // Update existing city
        await updateCity({ id: itemToEdit.id, ...cityData }).unwrap();
      } else {
        // Create new city
        await createCity(cityData).unwrap();
      }
      setIsCityFormModalOpen(false);
      setItemToEdit(null);
    } catch (error) {
      console.error("Failed to save city:", error);
      throw error;
    }
  };

  // Handle save area (add or edit)
  const handleSaveArea = async (areaData) => {
    try {
      if (itemToEdit) {
        // Update existing area
        await updateArea({ id: itemToEdit.id, ...areaData }).unwrap();
      } else {
        // Create new area
        await createArea(areaData).unwrap();
      }
      setIsAreaFormModalOpen(false);
      setItemToEdit(null);
    } catch (error) {
      console.error("Failed to save area:", error);
      throw error;
    }
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      if (itemToDelete.type === "city") {
        await deleteCity(itemToDelete.id).unwrap();
      } else {
        await deleteArea(itemToDelete.id).unwrap();
      }
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  // Get city name by ID
  const getCityName = (cityId) => {
    const city = cities.find((c) => c.id === cityId);
    return city ? city.name_en : "Unknown";
  };

  return (
    <>
      <AdminCard
        title="Locations Management"
        subtitle={`Cities: ${cities.length} | Areas: ${areas.length}`}
        icon={FaMapMarkerAlt}
        headerActions={
          <div className="flex gap-2">
            <AdminButton
              variant={activeTab === "cities" ? "primary" : "outline"}
              size="sm"
              onClick={() => setActiveTab("cities")}
            >
              Cities
            </AdminButton>
            <AdminButton
              variant={activeTab === "areas" ? "primary" : "outline"}
              size="sm"
              onClick={() => setActiveTab("areas")}
            >
              Areas
            </AdminButton>
          </div>
        }
      >
        {/* Tab Content */}
        {activeTab === "cities" ? (
          <div>
            <div className="mb-4 flex justify-end">
              <AdminButton
                variant="primary"
                size="sm"
                icon={FaPlus}
                onClick={handleAddCity}
              >
                Add New City
              </AdminButton>
            </div>

            {/* Cities Table */}
            {isLoading ? (
              <div className="text-center py-8">Loading cities...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name (English)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name (Arabic)
                      </th>
                      {/* <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cities.map((city) => (
                      <tr key={city.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {city.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {city.name_en}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {city.name_ar}
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEditCity(city)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            <FaEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteCity(city)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash size={18} />
                          </button>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {cities.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No cities found. Add your first city!
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="mb-4 flex justify-end">
              <AdminButton
                variant="primary"
                size="sm"
                icon={FaPlus}
                onClick={handleAddArea}
              >
                Add New Area
              </AdminButton>
            </div>

            {/* Areas Table */}
            {isLoading ? (
              <div className="text-center py-8">Loading areas...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        City
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name (English)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name (Arabic)
                      </th>
                      {/* <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {areas.map((area) => (
                      <tr key={area.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {area.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {getCityName(area.city_id)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {area.name_en}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {area.name_ar}
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEditArea(area)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            <FaEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteArea(area)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash size={18} />
                          </button>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {areas.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No areas found. Add your first area!
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </AdminCard>

      {/* City Form Modal (Add/Edit) */}
      <CityFormModal
        city={itemToEdit}
        isOpen={isCityFormModalOpen}
        onClose={() => {
          setIsCityFormModalOpen(false);
          setItemToEdit(null);
        }}
        onSave={handleSaveCity}
      />

      {/* Area Form Modal (Add/Edit) */}
      <AreaFormModal
        area={itemToEdit}
        cities={cities}
        isOpen={isAreaFormModalOpen}
        onClose={() => {
          setIsAreaFormModalOpen(false);
          setItemToEdit(null);
        }}
        onSave={handleSaveArea}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.name_en}
        itemType={itemToDelete?.type === "city" ? "City" : "Area"}
      />
    </>
  );
};

export default LocationsTab;
