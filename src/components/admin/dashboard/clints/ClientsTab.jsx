import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiUser } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import AdminCard from "../../ui/AdminCard";
import AdminButton from "../../ui/AdminButton";
import ClientsTable from "./ClientsTable";
import ClientDetailsModal from "./ClientDetailsModal";
import AddClientModal from "./AddClientModal";
import { useGetAllClientsQuery, useCreateClientMutation } from "../../../../features/clientsApi";
import {
  useGetAllCitiesQuery,
  useGetAreasByCityQuery,
} from "../../../../features/locationsApi";
import { useGetAllProjectsQuery } from "../../../../features/projectsApi";

const ClientsTab = () => {
  const { t } = useTranslation();
  const { data: clients = [], isLoading, error } = useGetAllClientsQuery();
  const [selectedClient, setSelectedClient] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project_id: "",
    city_id: "",
    area_id: "",
    unit_type: "",
    message: "",
  });
  const [selectedCityId, setSelectedCityId] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  // Fetch projects - always fetch
  const { data: projectsResponse, isLoading: projectsLoading } =
    useGetAllProjectsQuery(undefined, { skip: false });

  // Fetch cities - always fetch
  const { data: citiesResponse, isLoading: citiesLoading } =
    useGetAllCitiesQuery(undefined, { skip: false });

  // Fetch areas by city
  const { data: areasResponse, isLoading: areasLoading } =
    useGetAreasByCityQuery(
      { cityId: selectedCityId },
      { skip: !selectedCityId }
    );

  // Extract data from response
  const projects = Array.isArray(projectsResponse)
    ? projectsResponse
    : projectsResponse?.data || [];

  const cities = Array.isArray(citiesResponse)
    ? citiesResponse
    : citiesResponse?.data || [];

  const allAreas = Array.isArray(areasResponse)
    ? areasResponse
    : areasResponse?.data || [];
  const areas = allAreas.filter(
    (area) => area.city_id === parseInt(selectedCityId)
  );

  // Create client mutation
  const [createClient, { isLoading: isSubmitting }] = useCreateClientMutation();

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name === "city_id") {
      setSelectedCityId(value ? parseInt(value) : "");
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        area_id: "", // Reset area when city changes
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone) {
      setFormError("Please fill in all required fields");
      return;
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        unitType: formData.unit_type,
        projectId: formData.project_id ? parseInt(formData.project_id) : null,
        cityId: formData.city_id ? parseInt(formData.city_id) : null,
        areaId: formData.area_id ? parseInt(formData.area_id) : null,
      };

      await createClient(payload).unwrap();
      setFormSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        project_id: "",
        city_id: "",
        area_id: "",
        unit_type: "",
        message: "",
      });
      setSelectedCityId("");

      setTimeout(() => {
        setShowForm(false);
        setFormSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error creating client:", error);
      setFormError(
        error?.data?.message || "Failed to submit form. Please try again."
      );
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      project_id: "",
      city_id: "",
      area_id: "",
      unit_type: "",
      message: "",
    });
    setSelectedCityId("");
    setFormError("");
    setFormSuccess(false);
    setShowForm(false);
  };

  return (
    <AdminCard
      title={t("admin.clientRegisterList")}
      subtitle={t("admin.viewAllClientsRegistered")}
      icon={BiUser}
    >
      <div className="mt-4 mb-4 flex justify-end">
        <AdminButton
          onClick={() => setShowForm(true)}
          variant="primary"
          size="md"
          className="flex items-center gap-2"
        >
          <FiPlus className="w-4 h-4" />
          {t("admin.addNewClient")}
        </AdminButton>
      </div>

      <ClientsTable
        clients={clients}
        isLoading={isLoading}
        error={error}
        onClientSelect={setSelectedClient}
      />

      <ClientDetailsModal
        client={selectedClient}
        isOpen={!!selectedClient}
        onClose={() => setSelectedClient(null)}
      />

      <AddClientModal
        isOpen={showForm}
        formData={formData}
        formError={formError}
        formSuccess={formSuccess}
        isSubmitting={isSubmitting}
        projectsLoading={projectsLoading}
        citiesLoading={citiesLoading}
        areasLoading={areasLoading}
        projects={projects}
        cities={cities}
        areas={areas}
        onFormChange={handleFormChange}
        onFormSubmit={handleFormSubmit}
        onClose={resetForm}
      />
    </AdminCard>
  );
};

export default ClientsTab;
