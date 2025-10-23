import React, { useState } from "react";
import { FiSend, FiX } from "react-icons/fi";
import { useCreateClientMutation } from "../../features/clientsApi";
import {
  useGetAllCitiesQuery,
  useGetAreasByCityQuery,
} from "../../features/locationsApi";

const RegisterForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city_id: "",
    area_id: "",
    unit_type: "",
    message: "",
  });

  const [selectedCityId, setSelectedCityId] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Fetch cities
  const { data: citiesResponse, isLoading: citiesLoading } =
    useGetAllCitiesQuery();

  // Fetch areas by city
  const { data: areasResponse, isLoading: areasLoading } =
    useGetAreasByCityQuery(
      { cityId: selectedCityId },
      { skip: !selectedCityId }
    );

  // Extract data from response
  const cities = Array.isArray(citiesResponse)
    ? citiesResponse
    : citiesResponse?.data || [];

  const allAreas = Array.isArray(areasResponse)
    ? areasResponse
    : areasResponse?.data || [];
  const areas = allAreas.filter(
    (area) => area.city_id === parseInt(selectedCityId)
  );

  // Debug: Log cities and areas
  console.log("Cities from backend:", cities);
  console.log("Areas from backend:", allAreas);
  console.log("Filtered areas for city:", selectedCityId, areas);

  // Create client mutation
  const [createClient, { isLoading: isSubmitting }] = useCreateClientMutation();

  const handleChange = (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone) {
      setSubmitError("Please fill in all required fields");
      return;
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        unitType: formData.unit_type,
        cityId: parseInt(formData.city_id),
        areaId: parseInt(formData.area_id),
      };

      console.log("Sending payload:", payload);
      await createClient(payload).unwrap();
      setSubmitSuccess(true);

      setTimeout(() => {
        if (onClose) onClose();
      }, 2000);
    } catch (error) {
      console.error("Error creating client:", error);
      setSubmitError(
        error?.data?.message || "Failed to submit form. Please try again."
      );
    }
  };

  if (submitSuccess) {
    return (
      <div className="text-center py-8">
        <div className="icon-box !h-14 !w-14 !bg-green-500 text-white mx-auto text-2xl">
          <FiSend />
        </div>
        <h3 className="mt-4 text-xl font-semibold">Thank You!</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Your registration has been received. We'll contact you soon.
        </p>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4">Submitting...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-h-screen sm:max-h-[90vh] md:max-h-[85vh]">
      {/* Header with Close Button */}
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700 flex-shrink-0">
        <h2 className="text-lg sm:text-xl font-semibold">Register Now</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          aria-label="Close form"
        >
          <FiX className="text-xl sm:text-2xl" />
        </button>
      </div>

      {/* Scrollable Form Content */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {submitError && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm sticky top-0">
            {submitError}
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md outline-none bg-transparent dark:border-gray-700"
            placeholder="Your full name"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md outline-none bg-transparent dark:border-gray-700"
            placeholder="Your email address"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md outline-none bg-transparent dark:border-gray-700"
            placeholder="Your phone number"
            required
          />
        </div>

        <div>
          <label htmlFor="city_id" className="block text-sm font-medium mb-1">
            City
          </label>
          <select
            id="city_id"
            name="city_id"
            value={formData.city_id}
            onChange={handleChange}
            disabled={citiesLoading}
            className="w-full px-3 py-2 border rounded-md outline-none bg-slate-100 dark:bg-hover-color-dark opacity-70"
          >
            <option value="">
              {citiesLoading ? "Loading..." : "Select City"}
            </option>
            {cities &&
              cities.length > 0 &&
              cities.map((city) => (
                <option key={city.id} value={city.id} className="text-black">
                  {city.name_en || city.name || city.name_ar}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label htmlFor="area_id" className="block text-sm font-medium mb-1">
            Area
          </label>
          <select
            id="area_id"
            name="area_id"
            value={formData.area_id}
            onChange={handleChange}
            disabled={!formData.city_id || areasLoading}
            className="w-full px-3 py-2 border rounded-md outline-none bg-slate-100 dark:bg-hover-color-dark opacity-70"
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
                <option key={area.id} value={area.id} className="text-black">
                  {area.name_en || area.name || area.name_ar}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label htmlFor="unit_type" className="block text-sm font-medium mb-1">
            Unit Type
          </label>
          <select
            id="unit_type"
            name="unit_type"
            value={formData.unit_type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md outline-none bg-slate-100 dark:bg-hover-color-dark opacity-70"
          >
            <option value="">Select Unit Type</option>
            <option className="text-black" value="apartments">
              Apartments
            </option>
            <option className="text-black" value="studios">
              Studios
            </option>
            <option className="text-black" value="duplexes">
              Duplexes
            </option>
            <option className="text-black" value="offices">
              Offices
            </option>
            <option className="text-black" value="clinics">
              Clinics
            </option>
            <option className="text-black" value="retails">
              Retails
            </option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border rounded-md outline-none bg-transparent dark:border-gray-700"
            placeholder="Tell us about your interest"
          ></textarea>
        </div>
      </form>

      {/* Footer with Submit Button */}
      <div className="p-4  flex-shrink-0  ">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full btn btn-primary"
        >
          {isSubmitting ? "Submitting..." : "Register Now"}
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
