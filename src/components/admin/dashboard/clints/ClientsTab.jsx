import { useState } from "react";
import { BiUser, BiEnvelope, BiPhone, BiX } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import AdminCard from "../../ui/AdminCard";
import AdminButton from "../../ui/AdminButton";
import { useGetAllClientsQuery, useCreateClientMutation } from "../../../../features/clientsApi";
import {
  useGetAllCitiesQuery,
  useGetAreasByCityQuery,
} from "../../../../features/locationsApi";
import { useGetAllProjectsQuery } from "../../../../features/projectsApi";

const ClientsTab = () => {
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
      title="Client Register List"
      subtitle="View all clients registered from the website"
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
          Add New Client
        </AdminButton>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                <div className="flex items-center gap-2">
                  <BiUser className="w-4 h-4" />
                  Name
                </div>
              </th>
              <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                <div className="flex items-center gap-2">
                  <BiEnvelope className="w-4 h-4" />
                  Email
                </div>
              </th>
              <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                <div className="flex items-center gap-2">
                  <BiPhone className="w-4 h-4" />
                  Phone
                </div>
              </th>
              <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                Unit Type
              </th>
              <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                City
              </th>
              <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                Area
              </th>
              <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                Message
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr key="loading">
                <td colSpan="7" className="py-8 text-center text-gray-500">
                  Loading clients...
                </td>
              </tr>
            ) : error ? (
              <tr key="error">
                <td colSpan="7" className="py-8 text-center text-red-500">
                  Failed to load clients.
                </td>
              </tr>
            ) : clients.length > 0 ? (
              clients.map((client, index) => (
                <tr
                  key={client.id || index}
                  className="transition hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedClient(client)}
                >
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {client.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {client.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {client.phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                    {client.unitType}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {client.city?.name_en || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {client.area?.name_en || "-"}
                  </td>
                  <td className="max-w-xs px-6 py-4 text-sm text-gray-700 truncate">
                    {client.message}
                  </td>
                </tr>
              ))
            ) : (
              <tr key="no-clients">
                <td colSpan="7" className="py-8 text-center text-gray-500">
                  No clients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Client Details Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-primary to-secondary px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Client Details</h2>
              <button
                onClick={() => setSelectedClient(null)}
                className="text-white hover:bg-blue-800 p-1 rounded transition"
              >
                <BiX className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <BiUser className="w-5 h-5 text-blue-600" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Name
                    </p>
                    <p className="text-gray-900 font-medium mt-1">
                      {selectedClient.name}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Email
                    </p>
                    <p className="text-gray-900 font-medium mt-1 break-all">
                      {selectedClient.email}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Phone
                    </p>
                    <p className="text-gray-900 font-medium mt-1">
                      {selectedClient.phone}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Unit Type
                    </p>
                    <p className="text-gray-900 font-medium mt-1 capitalize">
                      {selectedClient.unitType}
                    </p>
                  </div>
                </div>
              </div>

              {/* Project Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Project Information
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Project
                  </p>
                  <p className="text-gray-900 font-medium mt-1">
                    {selectedClient.project?.title_en || selectedClient.project?.title_ar || "-"}
                  </p>
                </div>
              </div>

              {/* Location Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Location Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      City
                    </p>
                    <p className="text-gray-900 font-medium mt-1">
                      {selectedClient.city?.name_en || "-"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Area
                    </p>
                    <p className="text-gray-900 font-medium mt-1">
                      {selectedClient.area?.name_en || "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Message
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedClient.message || "No message provided"}
                  </p>
                </div>
              </div>

              {/* Additional Information */}
              {selectedClient.created_at && (
                <div className="border-t pt-4">
                  <p className="text-xs text-gray-500">
                    Registered on:{" "}
                    {new Date(selectedClient.created_at).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t flex justify-end gap-3">
              <button
                onClick={() => setSelectedClient(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Client Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-primary to-secondary px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Add New Client</h2>
              <button
                onClick={resetForm}
                className="text-white hover:bg-blue-800 p-1 rounded transition"
              >
                <BiX className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              {formError && (
                <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
                  {formError}
                </div>
              )}

              {formSuccess && (
                <div className="p-3 bg-green-100 text-green-700 rounded-md text-sm">
                  Client added successfully!
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1 text-black dark:text-white">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-md outline-none bg-transparent text-black dark:border-gray-700"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-black ">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-md outline-none bg-transparent text-black dark:border-gray-700"
                  placeholder="Your email address"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1 text-black ">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-md outline-none bg-transparent text-black dark:border-gray-700"
                  placeholder="Your phone number"
                  required
                />
              </div>

              <div>
                <label htmlFor="project_id" className="block text-sm font-medium mb-1 text-black ">
                  Project
                </label>
                <select
                  id="project_id"
                  name="project_id"
                  value={formData.project_id}
                  onChange={handleFormChange}
                  disabled={projectsLoading}
                  className="w-full px-3 py-2 border rounded-md outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">
                    {projectsLoading ? "Loading..." : "Select Project"}
                  </option>
                  {projects &&
                    projects.length > 0 &&
                    projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.title_en || project.title_ar || `Project ${project.id}`}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label htmlFor="city_id" className="block text-sm font-medium mb-1 text-black">
                  City
                </label>
                <select
                  id="city_id"
                  name="city_id"
                  value={formData.city_id}
                  onChange={handleFormChange}
                  disabled={citiesLoading}
                  className="w-full px-3 py-2 border rounded-md outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">
                    {citiesLoading ? "Loading..." : "Select City"}
                  </option>
                  {cities &&
                    cities.length > 0 &&
                    cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name_en || city.name || city.name_ar}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label htmlFor="area_id" className="block text-sm font-medium mb-1 text-black">
                  Area
                </label>
                <select
                  id="area_id"
                  name="area_id"
                  value={formData.area_id}
                  onChange={handleFormChange}
                  disabled={!formData.city_id || areasLoading}
                  className="w-full px-3 py-2 border rounded-md outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">
                    {!formData.city_id
                      ? "Select City First"
                      : areasLoading
                      ? "Loading..."
                      : "Select Area"}
                  </option>
                  {areas &&
                    areas.length > 0 &&
                    areas.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.name_en || area.name || area.name_ar}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label htmlFor="unit_type" className="block text-sm font-medium mb-1 text-black">
                  Unit Type
                </label>
                <select
                  id="unit_type"
                  name="unit_type"
                  value={formData.unit_type}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-md outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select Unit Type</option>
                  <option value="apartments">Apartments</option>
                  <option value="studios">Studios</option>
                  <option value="duplexes">Duplexes</option>
                  <option value="offices">Offices</option>
                  <option value="clinics">Clinics</option>
                  <option value="retails">Retails</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1 text-black">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  rows="3"
                  className="w-full px-3 py-2 border rounded-md outline-none  text-black dark:border-gray-700"
                  placeholder="Tell us about your interest"
                ></textarea>
              </div>
            </form>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t flex justify-end gap-3">
              <AdminButton
                type="button"
                variant="outline"
                onClick={resetForm}
              >
                Cancel
              </AdminButton>
              <AdminButton
                type="button"
                variant="primary"
                onClick={handleFormSubmit}
                loading={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Client"}
              </AdminButton>
            </div>
          </div>
        </div>
      )}
    </AdminCard>
  );
};

export default ClientsTab;
