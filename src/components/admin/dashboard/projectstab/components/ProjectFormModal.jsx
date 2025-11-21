import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaTimes, FaTrash } from "react-icons/fa";
import AdminButton from "../../../ui/AdminButton";
import { useGetAllCitiesQuery, useGetAreasByCityQuery } from "../../../../../features/locationsApi";
import { useGetAllServicesQuery } from "../../../../../features/servicesApi";

const ProjectFormModal = ({ project, isOpen, onClose, onSave }) => {
  const { data: cities = [] } = useGetAllCitiesQuery(undefined, { skip: !isOpen });
  const { data: allServices = [] } = useGetAllServicesQuery(undefined, { skip: !isOpen });
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title_en: "",
      title_ar: "",
      description_en: "",
      description_ar: "",
      short_description_en: "",
      short_description_ar: "",
      meta_title_en: "",
      meta_title_ar: "",
      meta_description_en: "",
      meta_description_ar: "",
      area: "",
      type: "residential",
      city_id: "",
      area_id: "",
      location: "",
      delivery_date: "",
      video_link: "",
    },
  });

  const [selectedCityId, setSelectedCityId] = useState("");
  const [deletedGalleryIds, setDeletedGalleryIds] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const { data: allAreas = [] } = useGetAreasByCityQuery({ cityId: selectedCityId }, { skip: !selectedCityId });
  const areas = allAreas.filter(area => area.city_id === selectedCityId);

  const cityIdValue = watch("city_id");

  useEffect(() => {
    if (cityIdValue) {
      setSelectedCityId(parseInt(cityIdValue));
    }
  }, [cityIdValue]);

  useEffect(() => {
    if (isOpen) {
      if (project) {
        reset({
          title_en: project.title_en || "",
          title_ar: project.title_ar || "",
          description_en: project.description_en || "",
          description_ar: project.description_ar || "",
          short_description_en: project.short_description_en || "",
          short_description_ar: project.short_description_ar || "",
          meta_title_en: project.meta_title_en || "",
          meta_title_ar: project.meta_title_ar || "",
          meta_description_en: project.meta_description_en || "",
          meta_description_ar: project.meta_description_ar || "",
          area: project.project_area || "",
          type: project.type || "residential",
          city_id: project.city_id || "",
          area_id: project.area_id || "",
          location: project.location || "",
          delivery_date: project.delivery_date || "",
          video_link: project.video_link || "",
        });
        setSelectedServices(project.services?.map((s) => s.id) || []);
        setGalleries(project.galleries || []);
        setDeletedGalleryIds([]);
        if (project.city_id) {
          setSelectedCityId(project.city_id);
        }
      } else {
        reset();
        setSelectedServices([]);
        setGalleries([]);
        setDeletedGalleryIds([]);
        setSelectedCityId("");
      }
      setSubmitError("");
    }
  }, [isOpen, project, reset]);

  const handleServiceToggle = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
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

  const removeGallery = (id) => {
    setGalleries((prev) => {
      const galleryToRemove = prev.find((g) => g.id === id);

      if (galleryToRemove && !galleryToRemove.file && Number.isInteger(galleryToRemove.id)) {
        setDeletedGalleryIds((prevDeleted) => [...prevDeleted, galleryToRemove.id]);
      }

      return prev.filter((g) => g.id !== id);
    });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setSubmitError("");

    try {
      const submitData = new FormData();

      submitData.append("title_en", data.title_en);
      submitData.append("title_ar", data.title_ar);
      submitData.append("description_en", data.description_en);
      submitData.append("description_ar", data.description_ar);
      submitData.append("short_description_en", data.short_description_en);
      submitData.append("short_description_ar", data.short_description_ar);
      submitData.append("meta_title_en", data.meta_title_en);
      submitData.append("meta_title_ar", data.meta_title_ar);
      submitData.append("meta_description_en", data.meta_description_en);
      submitData.append("meta_description_ar", data.meta_description_ar);
      submitData.append("area", data.area);
      submitData.append("type", data.type);
      submitData.append("city_id", data.city_id);
      submitData.append("area_id", data.area_id);
      submitData.append("location", data.location);
      submitData.append("delivery_date", data.delivery_date);
      submitData.append("video_link", data.video_link);

      // Handle file inputs
      const masterPlanInput = document.querySelector('input[name="master_plan"]');
      if (masterPlanInput?.files?.[0]) {
        submitData.append("master_plan", masterPlanInput.files[0]);
      }

      const logoInput = document.querySelector('input[name="logo"]');
      if (logoInput?.files?.[0]) {
        submitData.append("logo", logoInput.files[0]);
      }

      const googleMapInput = document.querySelector('input[name="google_map_image"]');
      if (googleMapInput?.files?.[0]) {
        submitData.append("google_map_image", googleMapInput.files[0]);
      }

      selectedServices.forEach((id) => submitData.append("services[]", id));

      galleries.forEach((g, index) => {
        if (g.file) {
          submitData.append(`galleries[${index}][file]`, g.file);
          submitData.append(`galleries[${index}][type]`, g.type);
        }
      });

      deletedGalleryIds.forEach((id) => {
        submitData.append("deleted_gallery_ids[]", id);
      });

      await onSave(submitData);
      onClose();
    } catch (error) {
      setSubmitError("Failed to save project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            {project ? "Edit Project" : "Add New Project"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 transition-colors hover:text-gray-700"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && (
            <div className="p-3 mb-4 text-red-700 bg-red-100 rounded-lg">
              {submitError}
            </div>
          )}

          {/* Basic Information */}
          <div className="mb-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Title (English) *
                </label>
                <input
                  type="text"
                  {...register("title_en", { required: "Title is required" })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.title_en ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.title_en && (
                  <p className="mt-1 text-sm text-red-500">{errors.title_en.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Title (Arabic) *
                </label>
                <input
                  type="text"
                  {...register("title_ar", { required: "Arabic Title is required" })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.title_ar ? "border-red-500" : "border-gray-300"
                  }`}
                  dir="rtl"
                />
                {errors.title_ar && (
                  <p className="mt-1 text-sm text-red-500">{errors.title_ar.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Project Type *
                </label>
                <select
                  {...register("type")}
                  className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Description (English) *
                </label>
                <textarea
                  {...register("description_en", { required: "Description is required" })}
                  rows="3"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.description_en ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.description_en && (
                  <p className="mt-1 text-sm text-red-500">{errors.description_en.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Description (Arabic) *
                </label>
                <textarea
                  {...register("description_ar", { required: "Arabic Description is required" })}
                  rows="3"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.description_ar ? "border-red-500" : "border-gray-300"
                  }`}
                  dir="rtl"
                />
                {errors.description_ar && (
                  <p className="mt-1 text-sm text-red-500">{errors.description_ar.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Short Description (English)
                </label>
                <textarea
                  {...register("short_description_en")}
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="Brief summary of the project"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Short Description (Arabic)
                </label>
                <textarea
                  {...register("short_description_ar")}
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="ملخص للمشروع"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Meta Title *
                </label>
                <input
                  type="text"
                  {...register("meta_title_en", { required: "Meta Title is required" })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.meta_title_en ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.meta_title_en && (
                  <p className="mt-1 text-sm text-red-500">{errors.meta_title_en.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Meta Description *
                </label>
                <input
                  type="text"
                  {...register("meta_description_en", { required: "Meta Description is required" })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.meta_description_en ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.meta_description_en && (
                  <p className="mt-1 text-sm text-red-500">{errors.meta_description_en.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Project Area (m²) *
                </label>
                <input
                  type="number"
                  {...register("area", { required: "Project Area is required" })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.area ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.area && (
                  <p className="mt-1 text-sm text-red-500">{errors.area.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Master Plan Image {!project && "*"}
                </label>
                {project && project.master_plan && (
                  <div className="mb-2">
                    <img
                      src={project.master_plan}
                      alt="Current Master Plan"
                      className="object-cover w-32 h-32 border border-gray-300 rounded-lg"
                    />
                    <p className="mt-1 text-xs text-gray-600">Current Image</p>
                  </div>
                )}
                <input
                  type="file"
                  name="master_plan"
                  accept="image/*"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {project && (
                  <p className="mt-1 text-xs text-gray-500">Leave empty to keep current image</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Project Logo
                </label>
                {project && project.logo && (
                  <div className="mb-2">
                    <img
                      src={project.logo}
                      alt="Current Logo"
                      className="object-cover w-32 h-32 border border-gray-300 rounded-lg"
                    />
                    <p className="mt-1 text-xs text-gray-600">Current Logo</p>
                  </div>
                )}
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {project && (
                  <p className="mt-1 text-xs text-gray-500">Leave empty to keep current logo</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Google Map Image
                </label>
                {project && project.google_map_image && (
                  <div className="mb-2">
                    <img
                      src={project.google_map_image}
                      alt="Current Google Map"
                      className="object-cover w-32 h-32 border border-gray-300 rounded-lg"
                    />
                    <p className="mt-1 text-xs text-gray-600">Current Map Image</p>
                  </div>
                )}
                <input
                  type="file"
                  name="google_map_image"
                  accept="image/*"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {project && (
                  <p className="mt-1 text-xs text-gray-500">Leave empty to keep current map image</p>
                )}
                <p className="mt-1 text-xs text-gray-500">Screenshot or image of the project location from Google Maps</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Location
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  City *
                </label>
                <select
                  {...register("city_id", { required: "City is required" })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.city_id ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name_en}
                    </option>
                  ))}
                </select>
                {errors.city_id && (
                  <p className="mt-1 text-sm text-red-500">{errors.city_id.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Area *
                </label>
                <select
                  {...register("area_id", { required: "Area is required" })}
                  disabled={!selectedCityId}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.area_id ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Area</option>
                  {areas.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.name_en}
                    </option>
                  ))}
                </select>
                {errors.area_id && (
                  <p className="mt-1 text-sm text-red-500">{errors.area_id.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Location URL (Google Maps) *
                </label>
                <input
                  type="url"
                  {...register("location", { required: "Location is required" })}
                  placeholder="https://maps.google.com/..."
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-500">{errors.location.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Delivery Date
                </label>
                <input
                  type="date"
                  {...register("delivery_date")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Video Link (YouTube)
                </label>
                <input
                  type="url"
                  {...register("video_link")}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="mb-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Services & Amenities
            </h3>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
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
                  <span className="text-sm font-medium text-gray-900">
                    {service.name_en}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="mb-6">
            <div className="flex flex-col gap-3 items-start md:items-center md:justify-between mb-4 md:flex-row">
              <h3 className="text-lg font-semibold text-gray-800">Gallery</h3>
              <div className="flex flex-col gap-2 w-full md:w-auto md:flex-row">
                <button
                  type="button"
                  onClick={() => addGallery("image")}
                  className="w-full md:w-auto px-3 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors text-sm md:text-base"
                >
                  Add Images
                </button>
                <button
                  type="button"
                  onClick={() => addGallery("video")}
                  className="w-full md:w-auto px-3 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors text-sm md:text-base"
                >
                  Add Videos
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {galleries.map((gallery) => (
                <div key={gallery.id} className="relative group">
                  {gallery.type === "image" ? (
                    <img
                      src={gallery.url}
                      alt="Gallery"
                      className="object-cover w-full h-32 rounded-lg"
                    />
                  ) : (
                    <video
                      src={gallery.url}
                      className="object-cover w-full h-32 rounded-lg"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => removeGallery(gallery.id)}
                    className="absolute p-2 text-white transition-opacity bg-red-500 rounded-full opacity-0 top-2 right-2 group-hover:opacity-100"
                  >
                    <FaTrash size={12} />
                  </button>
                  <span className="absolute px-2 py-1 text-xs text-white bg-black bg-opacity-50 rounded bottom-2 left-2">
                    {gallery.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-center gap-3 pt-6 mt-6 border-t border-gray-200">
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
              disabled={loading}
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
