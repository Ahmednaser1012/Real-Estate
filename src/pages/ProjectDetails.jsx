import { useState } from "react";
import { useParams } from "react-router-dom";
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
  const { id } = useParams();
  const { data: project, isLoading, error } = useGetProjectByIdQuery(id);
  const { data: allProperties = [] } = useGetAllPropertiesQuery();

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  // Filter properties for this project
  const projectProperties = allProperties.filter(
    (property) => property.projectId === parseInt(id)
  );

  // Get all media (images and videos)
  const allMedia = project?.galleries || [];
  let images = allMedia.filter((item) => item.type === "image");
  const videos = allMedia.filter((item) => item.type === "video");

  // If no images in galleries, use masterPlan as fallback
  if (images.length === 0 && project?.masterPlan) {
    images = [{ id: "master-plan", url: project.masterPlan, type: "image" }];
  }

  // Debug: Log project data
  console.log("Project Data:", project);
  console.log("All Media:", allMedia);
  console.log("Images:", images);
  console.log("Videos:", videos);
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
            Project Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            The project you're looking for doesn't exist or has been removed.
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
              Overview
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
              Properties ({projectProperties.length})
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
                Videos ({videos.length})
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
                      About This Project
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
                            {project.city?.name_en ||
                              project.city?.name ||
                              project.city}
                            ,{" "}
                            {project.area?.name_en ||
                              project.area?.name ||
                              project.area}
                          </span>
                        </div>
                        {project.type && (
                          <div className="flex items-center gap-2">
                            <BiBuilding className="text-primary" />
                            <span className="capitalize">{project.type}</span>
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

                    {/* Description */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3">
                        Description
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                        {project.description || "No description available."}
                      </p>
                    </div>

                    {/* Amenities & Services */}
                    {project.services && project.services.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold mb-3">
                          Amenities & Services
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {project.services.map((service) => (
                            <div
                              key={service.id}
                              className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-dark rounded-lg"
                            >
                              {service.icon && (
                                <img
                                  src={service.icon}
                                  alt={service.name}
                                  className="w-5 h-5"
                                />
                              )}
                              <span className="text-sm font-medium">
                                {service.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sidebar Info */}
                <div className="lg:col-span-1">
                  <div className="bg-white dark:bg-dark-light rounded-lg p-6 shadow-md sticky top-24">
                    <h3 className="text-xl font-bold mb-4">
                      Project Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">
                          Type
                        </span>
                        <span className="font-semibold capitalize">
                          {project.type || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">
                          City
                        </span>
                        <span className="font-semibold text-right">
                          {project.city?.name_en ||
                            project.city?.name ||
                            project.city}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">
                          Area
                        </span>
                        <span className="font-semibold text-right">
                          {project.area?.name_en ||
                            project.area?.name ||
                            project.area}
                        </span>
                      </div>
                      {project.ProjectArea && (
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                          <span className="text-gray-600 dark:text-gray-400">
                            Project Area
                          </span>
                          <span className="font-semibold">
                            {project.ProjectArea}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">
                          Properties
                        </span>
                        <span className="font-semibold">
                          {projectProperties.length}
                        </span>
                      </div>
                      {project.location && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">
                            Location
                          </span>
                          <a 
                            href={project.location}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-primary hover:underline flex items-center gap-1"
                          >
                            <BiMap className="text-lg" />
                            View Map
                          </a>
                        </div>
                      )}
                    </div>

                    {project.masterPlan && (
                      <div className="mt-6">
                        <h4 className="font-semibold mb-2">Master Plan</h4>
                        <div
                          className="cursor-pointer group relative overflow-hidden rounded-lg"
                          onClick={() => {
                            setSelectedImage({
                              id: "master-plan",
                              url: project.masterPlan,
                            });
                            setCurrentImageIndex(0);
                          }}
                        >
                          <img
                            src={project.masterPlan}
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
                          {property.type}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold mb-2 capitalize">
                          {property.type}
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">
                              Area
                            </span>
                            <span className="font-semibold">
                              {property.areaMin} - {property.areaMax} m²
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">
                              Price
                            </span>
                            <span className="font-semibold text-primary">
                              {property.priceMin?.toLocaleString()} -{" "}
                              {property.priceMax?.toLocaleString()} EGP
                            </span>
                          </div>
                          {property.noOfBedroomsMin > 0 && (
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">
                                Bedrooms
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
                                Bathrooms
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
                    No properties available for this project yet.
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
