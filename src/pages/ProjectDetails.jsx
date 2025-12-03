import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetProjectByIdQuery } from "../features/projectsApi";
import { useGetAllPropertiesQuery } from "../features/propertiesApi";
import {
  BiMap,
  BiBuilding,
  BiArea,
  BiChevronLeft,
  BiChevronRight,
  BiX,
} from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";

const ProjectDetails = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const { data: project, isLoading, error } = useGetProjectByIdQuery(id);
  const { data: propertiesResponse = {} } = useGetAllPropertiesQuery();

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  // Auto-rotate services every 3 seconds
  useEffect(() => {
    if (!project?.services || project.services.length === 0) return;

    const interval = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % project.services.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [project?.services]);

  // Extract properties array from response (handle both array and object responses)
  const allProperties = Array.isArray(propertiesResponse)
    ? propertiesResponse
    : propertiesResponse?.data || [];

  // Filter properties for this project
  // Try both project_id and projectId since API might use either
  const projectProperties = allProperties.filter((property) => {
    const propertyProjectId = property.project_id || property.projectId;
    return propertyProjectId === parseInt(id);
  });

  // Get all media (images and videos)
  const allMedia = project?.galleries || [];
  let images = allMedia.filter((item) => item.type === "image");
  const videos = allMedia.filter((item) => item.type === "video");

  // Add master_plan, logo, and google_map_image to images if they exist
  if (project?.master_plan) {
    images.unshift({ id: "master-plan", url: project.master_plan, type: "image" });
  }
  if (project?.logo) {
    images.push({ id: "logo", url: project.logo, type: "image" });
  }
  if (project?.google_map_image) {
    images.push({ id: "google-map", url: project.google_map_image, type: "image" });
  }

  // Debug: Log project data
  console.log("Project ID:", id);
  console.log("All Properties:", allProperties);
  console.log("Project Data:", project);
  console.log("Project Properties:", projectProperties);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setSelectedImage(images[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {t("projects.projectNotFound")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t("projects.projectNotFoundDesc")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-4 px-2 font-semibold transition-colors relative ${
                activeTab === "overview"
                  ? "text-primary"
                  : "text-gray-600 dark:text-gray-400 hover:text-primary"
              }`}
            >
              {t("projects.overview")}
              {activeTab === "overview" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("properties")}
              className={`pb-4 px-2 font-semibold transition-colors relative ${
                activeTab === "properties"
                  ? "text-primary"
                  : "text-gray-600 dark:text-gray-400 hover:text-primary"
              }`}
            >
              {t("projects.properties")} ({projectProperties.length})
              {activeTab === "properties" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
            {videos.length > 0 && (
              <button
                onClick={() => setActiveTab("videos")}
                className={`pb-4 px-2 font-semibold transition-colors relative ${
                  activeTab === "videos"
                    ? "text-primary"
                    : "text-gray-600 dark:text-gray-400 hover:text-primary"
                }`}
              >
                {t("projects.videos")} ({videos.length})
                {activeTab === "videos" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Description and Sidebar */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Description */}
                <div className="lg:col-span-2">
                  <div className="bg-white dark:bg-dark-light rounded-lg p-6 shadow-md">
                    <h2 className="text-2xl font-bold mb-4">
                      {t("projects.aboutThisProject")}
                    </h2>

                    {/* Project Title and Info */}
                    <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <BiMap className="text-primary" />
                          <span>
                            {i18n.language === "ar"
                              ? project.city?.name_ar || project.city?.name || project.city
                              : project.city?.name_en || project.city?.name || project.city}
                            ,{" "}
                            {i18n.language === "ar"
                              ? project.area?.name_ar || project.area?.name || project.area
                              : project.area?.name_en || project.area?.name || project.area}
                          </span>
                        </div>
                        {project.type && (
                          <div className="flex items-center gap-2">
                            <BiBuilding className="text-primary" />
                            <span className="capitalize">{t(`enums.projectTypes.${project.type}`)}</span>
                          </div>
                        )}
                        {project.ProjectArea && (
                          <div className="flex items-center gap-2">
                            <BiArea className="text-primary" />
                            <span>{project.ProjectArea} m²</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Image Gallery */}
                    {images.length > 0 && (
                      <div className="mb-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {images.slice(0, 6).map((image, index) => (
                            <div
                              key={image.id}
                              className="relative h-32 rounded-lg overflow-hidden cursor-pointer group"
                              onClick={() => openLightbox(index)}
                            >
                              <img
                                src={image.url}
                                alt={`${project.title} ${index + 1}`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                              {index === 5 && images.length > 6 && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                  <span className="text-white text-lg font-bold">
                                    +{images.length - 6}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Short Description */}
                    {(project.short_description_en || project.short_description_ar) && (
                      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h4 className="text-lg font-semibold mb-2 text-blue-900 dark:text-blue-100">
                          {t("projects.quickOverview")}
                        </h4>
                        <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                          {i18n.language === "ar"
                            ? project.short_description_ar || project.short_description_en
                            : project.short_description_en || project.short_description_ar}
                        </p>
                      </div>
                    )}

                    {/* Description */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3">
                        {t("projects.description")}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                        {i18n.language === "ar"
                          ? project.description_ar || project.description_en || "No description available."
                          : project.description_en || project.description_ar || "No description available."}
                      </p>
                    </div>

                    {/* Amenities & Services Carousel */}
                    {project.services && project.services.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold mb-4">
                          {t("projects.amenitiesServices")}
                        </h4>
                        <div className="relative">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={currentServiceIndex}
                              initial={{ opacity: 0, x: 100 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -100 }}
                              transition={{ duration: 0.5 }}
                              className="flex items-center justify-between gap-4 bg-gradient-to-r rounded-lg border overflow-hidden p-5"
                            >
                              {/* Navigation Button - Left */}
                              <button
                                onClick={() =>
                                  setCurrentServiceIndex(
                                    (prev) =>
                                      (prev - 1 + project.services.length) %
                                      project.services.length
                                  )
                                }
                                className="p-3   transition-colors flex-shrink-0"
                              >
                                <BiChevronLeft className="text-2xl " />
                              </button>

                              {/* Service Image - Full Square Box */}
                              <div className="w-48 h-48 flex-shrink-0 flex items-center justify-center bg-white dark:bg-dark rounded-lg overflow-hidden">
                                {project.services[currentServiceIndex]
                                  ?.image ? (
                                  <img
                                    src={
                                      project.services[currentServiceIndex]
                                        .image
                                    }
                                    alt={
                                      project.services[currentServiceIndex]
                                        .name_en
                                    }
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.style.display = "none";
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary text-6xl font-bold">
                                    ✓
                                  </div>
                                )}
                              </div>

                              {/* Service Name */}
                              <div className="flex-1 px-4">
                                <p className="text-xl font-bold text-gray-900 dark:text-white text-center">
                                  {i18n.language === "ar"
                                    ? project.services[currentServiceIndex]?.name_ar ||
                                      project.services[currentServiceIndex]?.name_en ||
                                      "Service"
                                    : project.services[currentServiceIndex]?.name_en ||
                                      project.services[currentServiceIndex]?.name_ar ||
                                      "Service"}
                                </p>
                              </div>

                              {/* Navigation Button - Right */}
                              <button
                                onClick={() =>
                                  setCurrentServiceIndex(
                                    (prev) =>
                                      (prev + 1) % project.services.length
                                  )
                                }
                                className="p-3   transition-colors flex-shrink-0"
                              >
                                <BiChevronRight className="text-2xl  " />
                              </button>
                            </motion.div>
                          </AnimatePresence>

                          {/* Dots Indicator */}
                          <div className="flex justify-center gap-2 mt-4">
                            {project.services.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentServiceIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                  index === currentServiceIndex
                                    ? "bg-primary w-6"
                                    : "bg-gray-300 dark:bg-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sidebar Info */}
                <div className="lg:col-span-1">
                  <div className="bg-white dark:bg-dark-light rounded-lg p-6 shadow-md sticky top-24">
                    <h3 className="text-xl font-bold mb-4">
                      {t("projects.projectInformation")}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">
                          {t("projects.type")}
                        </span>
                        <span className="font-semibold capitalize">
                          {project.type ? t(`enums.projectTypes.${project.type}`) : "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">
                          {t("projects.city")}
                        </span>
                        <span className="font-semibold text-right">
                          {i18n.language === "ar"
                            ? project.city?.name_ar || project.city?.name || project.city
                            : project.city?.name_en || project.city?.name || project.city}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">
                          {t("projects.area")}
                        </span>
                        <span className="font-semibold text-right">
                          {i18n.language === "ar"
                            ? project.area?.name_ar || project.area?.name || project.area
                            : project.area?.name_en || project.area?.name || project.area}
                        </span>
                      </div>


                     
                        {/* <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                          <span className="text-gray-600 dark:text-gray-400">
                            {t("projects.projectArea")}
                          </span>
                          <span className="font-semibold">
                            {project.ProjectArea}
                          </span>
                        </div> */}
                      
                      {/* <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">
                          {t("projects.properties")}
                        </span>
                        <span className="font-semibold">
                          {projectProperties.length}
                        </span>
                      </div> */}
                      {project.location && (
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                          <span className="text-gray-600 dark:text-gray-400">
                            {t("projects.location")}
                          </span>
                          <a
                            href={project.location}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-primary hover:underline flex items-center gap-1"
                          >
                            <BiMap className="text-lg" />
                            {t("projects.viewMap")}
                          </a>
                        </div>
                      )}
                      {project.project_area && (
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                          <span className="text-gray-600 dark:text-gray-400">
                            {t("projects.totalArea")}
                          </span>
                          <span className="font-semibold">
                            {project.project_area} m²
                          </span>
                        </div>
                      )}
                      {project.delivery_date && (
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                          <span className="text-gray-600 dark:text-gray-400">
                            {t("projects.deliveryDate")}
                          </span>
                          <span className="font-semibold">
                            {new Date(project.delivery_date).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      {project.video_link && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">
                            {t("projects.videos")}
                          </span>
                          <a
                            href={project.video_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-primary hover:underline"
                          >
                            {t("projects.watchVideo")}
                          </a>
                        </div>
                      )}
                    </div>

                    {project.master_plan && (
                      <div className="mt-6">
                        <h4 className="font-semibold mb-2">{t("projects.masterPlan")}</h4>
                        <div
                          className="cursor-pointer group relative overflow-hidden rounded-lg"
                          onClick={() => {
                            setSelectedImage({
                              id: "master-plan",
                              url: project.master_plan,
                            });
                            setCurrentImageIndex(0);
                          }}
                        >
                          <img
                            src={project.master_plan}
                            alt="Master Plan"
                            className="w-full rounded-lg group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "properties" && (
            <motion.div
              key="properties"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {projectProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projectProperties.map((property) => (
                    <div
                      key={property.id}
                      className="bg-white dark:bg-dark-light rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                    >
                      <div
                        className="relative h-48 cursor-pointer group"
                        onClick={() => {
                          setSelectedImage({
                            id: property.id,
                            url: property.image || "/images/property (1).jpg",
                          });
                          setCurrentImageIndex(0);
                        }}
                      >
                        <img
                          src={property.image || "/images/property (1).jpg"}
                          alt={property.type}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold capitalize">
                          {t(`enums.propertyTypes.${property.type}`)}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold mb-2 capitalize">
                          {t(`enums.propertyTypes.${property.type}`)}
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">
                              {t("property.area")}
                            </span>
                            <span className="font-semibold">
                              {property.areaMin} - {property.areaMax} m²
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">
                              {t("property.price")}
                            </span>
                            <span className="font-semibold ">
                              {property.priceMin?.toLocaleString()} -{" "}
                              {property.priceMax?.toLocaleString()} EGP
                            </span>
                          </div>
                          {property.noOfBedroomsMin > 0 && (
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">
                                {t("property.bedrooms")}
                              </span>
                              <span className="font-semibold">
                                {property.noOfBedroomsMin}m -{" "}
                                {property.noOfBedroomsMax}m
                              </span>
                            </div>
                          )}
                          {property.noOfBathroomsMin > 0 && (
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">
                                {t("property.bathrooms")}
                              </span>
                              <span className="font-semibold">
                                {property.noOfBathroomsMin}m -{" "}
                                {property.noOfBathroomsMax}m
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-500">
                    {t("projects.noPropertiesAvailable")}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "videos" && (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="rounded-lg overflow-hidden shadow-md"
                  >
                    <video
                      controls
                      className="w-full h-auto"
                      poster={images[0]?.url}
                    >
                      <source src={video.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white text-3xl hover:text-primary transition-colors"
              >
                <BiX />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 text-white text-4xl hover:text-primary transition-colors"
              >
                <BiChevronLeft />
              </button>

              <motion.img
                key={selectedImage.id}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                src={selectedImage.url}
                alt={project.title}
                className="max-w-full max-h-[90vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 text-white text-4xl hover:text-primary transition-colors"
              >
                <BiChevronRight />
              </button>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
                {currentImageIndex + 1} / {images.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectDetails;
