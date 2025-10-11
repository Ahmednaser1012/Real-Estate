import { useState, useEffect } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import AdminButton from "../../../ui/AdminButton";
import { useGetAllCitiesQuery, useGetAreasByCityQuery } from "../../../../../features/locationsApi";
import { useGetAllServicesQuery } from "../../../../../features/servicesApi";

const ProjectFormModal = ({ project, isOpen, onClose, onSave }) => {
  const { data: cities = [] } = useGetAllCitiesQuery(undefined, { skip: !isOpen });
  const { data: allServices = [] } = useGetAllServicesQuery(undefined, { skip: !isOpen });
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    metaTitle: "",
    metaDescription: "",
    area: "",
    type: "residential",
    cityId: "",
    areaId: "",
    location: "",
    masterPlan: null,
  });

  const [selectedCityId, setSelectedCityId] = useState("");
  const { data: allAreas = [] } = useGetAreasByCityQuery({ cityId: selectedCityId }, { skip: !selectedCityId });
  const areas = allAreas.filter(area => area.city_id === selectedCityId);

  const [selectedServices, setSelectedServices] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (project) {
        console.log("Editing project:", project);
        console.log("Project ID:", project.id);
        setFormData({
          title: project.title || "",
          description: project.description || "",
          metaTitle: project.metaTitle || "",
          metaDescription: project.metaDescription || "",
          area: project.ProjectArea || "",
          type: project.type || "residential",
          cityId: project.city?.id || "",
          areaId: project.area?.id || "",
          location: project.location || "",
          masterPlan: null,
        });
        setSelectedServices(project.services?.map((s) => s.id) || []);
        setGalleries(project.galleries || []);
        if (project.city?.id) {
          setSelectedCityId(project.city.id);
        }
      } else {
        resetForm();
      }
    }
  }, [isOpen, project]);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      metaTitle: "",
      metaDescription: "",
      area: "",
      type: "residential",
      cityId: "",
      areaId: "",
      location: "",
      masterPlan: null,
    });
    setSelectedCityId("");
    setSelectedServices([]);
    setGalleries([]);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (name === "cityId") {
      setSelectedCityId(value ? parseInt(value) : "");
      setFormData((prev) => ({ ...prev, areaId: "" }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files?.[0]) setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleServiceToggle = (id) => {
    setSelectedServices((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const addGallery = (type) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = type === "image" ? "image/*" : "video/*";
    input.multiple = true;
    input.onchange = (e) => {
      const files = Array.from(e.target.files);
      const newGalleries = files.map((file) => ({
        id: Date.now() + Math.random(),
        type,
        file,
        url: URL.createObjectURL(file),
      }));
      setGalleries((prev) => [...prev, ...newGalleries]);
    };
    input.click();
  };

  const removeGallery = (id) => setGalleries((prev) => prev.filter((g) => g.id !== id));

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.metaTitle.trim()) newErrors.metaTitle = "Meta Title is required";
    if (!formData.metaDescription.trim()) newErrors.metaDescription = "Meta Description is required";
    if (!formData.area) newErrors.area = "Project Area is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!project && !formData.masterPlan) newErrors.masterPlan = "Master Plan image is required";
    if (!formData.cityId) newErrors.cityId = "City is required";
    if (!formData.areaId) newErrors.areaId = "Area is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const submitData = new FormData();
      
      // Use exact backend field names
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('metaTitle', formData.metaTitle);
      submitData.append('metaDescription', formData.metaDescription);
      submitData.append('area', formData.area);
      submitData.append('type', formData.type);
      submitData.append('cityId', formData.cityId);
      submitData.append('areaId', formData.areaId);
      submitData.append('location', formData.location);
      
      // Only append masterPlan if a new file is selected
      if (formData.masterPlan) {
        submitData.append('masterPlan', formData.masterPlan);
      }

      // Append services
      selectedServices.forEach((id) => submitData.append("services[]", id));

      // Append galleries
      galleries.forEach((g) => {
        if (g.file) {
          submitData.append(`galleries[]`, g.file);
          submitData.append(`galleryTypes[]`, g.type);
        }
      });

      await onSave(submitData);
      onClose();
    } catch (error) {
      setErrors({ submit: "Failed to save project. Please try again." });
    } finally {
      setLoading(false);
    }
  };
  
  const isFormValid = () => {
    return formData.title.trim() && 
           formData.description.trim() && 
           formData.metaTitle.trim() && 
           formData.metaDescription.trim() && 
           formData.area && 
           formData.location.trim() && 
           (project || formData.masterPlan) && 
           formData.cityId && 
           formData.areaId;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-800">
            {project ? "Edit Project" : "Add New Project"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {errors.submit}
            </div>
          )}

          {/* Basic Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title *
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.metaTitle ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.metaTitle && (
                  <p className="text-red-500 text-sm mt-1">{errors.metaTitle}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description *
                </label>
                <input
                  type="text"
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.metaDescription ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.metaDescription && (
                  <p className="text-red-500 text-sm mt-1">{errors.metaDescription}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Area (m²) *
                </label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.area ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.area && (
                  <p className="text-red-500 text-sm mt-1">{errors.area}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Master Plan Image {!project && "*"}
                </label>
                {project && project.masterPlan && (
                  <div className="mb-2">
                    <img 
                      src={project.masterPlan} 
                      alt="Current Master Plan" 
                      className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                    />
                    <p className="text-gray-600 text-xs mt-1">Current Image</p>
                  </div>
                )}
                <input
                  type="file"
                  name="masterPlan"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.masterPlan ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.masterPlan && (
                  <p className="text-red-500 text-sm mt-1">{errors.masterPlan}</p>
                )}
                {project && (
                  <p className="text-gray-500 text-xs mt-1">Leave empty to keep current image</p>
                )}
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Location
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <select
                  name="cityId"
                  value={formData.cityId}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.cityId ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name_en}
                    </option>
                  ))}
                </select>
                {errors.cityId && (
                  <p className="text-red-500 text-sm mt-1">{errors.cityId}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area *
                </label>
                <select
                  name="areaId"
                  value={formData.areaId}
                  onChange={handleChange}
                  disabled={!formData.cityId}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.areaId ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Area</option>
                  {areas.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.name_en}
                    </option>
                  ))}
                </select>
                {errors.areaId && (
                  <p className="text-red-500 text-sm mt-1">{errors.areaId}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location URL (Google Maps) *
                </label>
                <input
                  type="url"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="https://maps.google.com/..."
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Services & Amenities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {allServices.map((service) => (
                <label
                  key={service.id}
                  className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedServices.includes(service.id)
                      ? "bg-green-50 border-green-500"
                      : "hover:bg-gray-50 border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service.id)}
                    onChange={() => handleServiceToggle(service.id)}
                    className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2 accent-green-600"
                  />
                  <span className="text-sm text-gray-900 font-medium">
                    {service.name_en}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Gallery</h3>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => addGallery("image")}
                  className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Add Images
                </button>
                <button
                  type="button"
                  onClick={() => addGallery("video")}
                  className="px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                >
                  Add Videos
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {galleries.map((gallery) => (
                <div key={gallery.id} className="relative group">
                  {gallery.type === "image" ? (
                    <img
                      src={gallery.url}
                      alt="Gallery"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ) : (
                    <video
                      src={gallery.url}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => removeGallery(gallery.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTrash size={12} />
                  </button>
                  <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    {gallery.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-3 justify-center mt-6 pt-6 border-t border-gray-200">
            <AdminButton
              type="button"
              variant="outline"
              size="md"
              onClick={onClose}
            >
              Cancel
            </AdminButton>
            <AdminButton
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              disabled={!isFormValid() || loading}
            >
              {project ? "Save Changes" : "Add Project"}
            </AdminButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectFormModal;
