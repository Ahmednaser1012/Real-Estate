import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaTimes,
  FaEdit,
  FaTrash,
  FaMapMarkerAlt,
  FaLink,
} from "react-icons/fa";
import { BiBuildings } from "react-icons/bi";

const ProjectDetailsModal = ({
  project,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  const { t, i18n } = useTranslation();

  if (!isOpen || !project) return null;

  console.log("Project Details:", project);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">{t("projects.projectDetails")}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Master Plan Image */}
          <div className="mb-6">
            {project.master_plan ? (
              <img
                src={project.master_plan}
                alt={project.title_en || project.title_ar}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <BiBuildings className="text-8xl text-gray-400" />
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {i18n.language === "ar" ? (project.title_ar || project.title_en || "N/A") : (project.title_en || project.title_ar || "N/A")}
            </h3>
            <div className="flex items-center text-gray-600 mb-4">
              <FaMapMarkerAlt className="mr-2" />
              <span>
                {typeof project.area === 'object' ? (i18n.language === "ar" ? project.area?.name_ar : project.area?.name_en) : project.area || "N/A"},{" "}
                {typeof project.city === 'object' ? (i18n.language === "ar" ? project.city?.name_ar : project.city?.name_en) : project.city || "N/A"}
              </span>
            </div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                project.type === "residential"
                  ? "bg-green-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {t(`enums.projectTypes.${project.type}`)}
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              {t("projects.projectDescription")}
            </h4>
            <p className="text-gray-600" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
              {i18n.language === "ar" ? (project.description_ar || project.description_en) : (project.description_en || project.description_ar)}
            </p>
          </div>

          {/* Meta Information */}
          {(project.meta_title_en || project.meta_title_ar || project.meta_description_en || project.meta_description_ar) && (
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {(project.meta_title_en || project.meta_title_ar) && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    {t("projects.metaTitleEnglish")}
                  </h4>
                  <p className="text-gray-600" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
                    {i18n.language === "ar" ? (project.meta_title_ar || project.meta_title_en) : (project.meta_title_en || project.meta_title_ar)}
                  </p>
                </div>
              )}
              {(project.meta_description_en || project.meta_description_ar) && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    {t("projects.metaDescriptionEnglish")}
                  </h4>
                  <p className="text-gray-600" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
                    {i18n.language === "ar" ? (project.meta_description_ar || project.meta_description_en) : (project.meta_description_en || project.meta_description_ar)}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Project Area */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              {t("projects.area")}
            </h4>
            <p className="text-gray-600">
              {project.project_area || "N/A"} m²
            </p>
          </div>

          {/* Delivery Date */}
          {project.delivery_date && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {t("events.date")}
              </h4>
              <p className="text-gray-600">
                {new Date(project.delivery_date).toLocaleDateString()}
              </p>
            </div>
          )}

          {/* Video Link */}
          {project.video_link && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {t("projects.videoUrl")}
              </h4>
              <a
                href={project.video_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
              >
                <FaLink />
                {t("common.viewAll")}
              </a>
            </div>
          )}

          {/* Location URL */}
          {project.location && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {t("property.location")}
              </h4>
              <a
                href={project.location}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
              >
                <FaLink />
                {t("common.viewAll")}
              </a>
            </div>
          )}

          {/* Short Description */}
          {(project.short_description_en || project.short_description_ar) && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {i18n.language === "ar" ? t("projects.shortDescriptionArabic") : t("projects.shortDescriptionEnglish")}
              </h4>
              <p className="text-gray-600" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
                {i18n.language === "ar" ? (project.short_description_ar || project.short_description_en) : (project.short_description_en || project.short_description_ar)}
              </p>
            </div>
          )}

          {/* Logo */}
          {project.logo && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {t("projects.projectLogo")}
              </h4>
              <img
                src={project.logo}
                alt={t("projects.currentImage")}
                className="w-32 h-32 object-cover rounded-lg border border-gray-300"
              />
            </div>
          )}

          {/* Google Map Image */}
          {project.google_map_image && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {t("property.location")}
              </h4>
              <img
                src={project.google_map_image}
                alt={t("property.location")}
                className="w-full h-64 object-cover rounded-lg border border-gray-300"
              />
            </div>
          )}

          {/* Services */}
          {project.services && project.services.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                {t("services.management")}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {project.services.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg"
                  >
                    {service.image && (
                      <img
                        src={service.image}
                        alt={i18n.language === "ar" ? service.name_ar : service.name_en}
                        className="w-8 h-8 object-cover rounded"
                      />
                    )}
                    <span className="text-sm text-gray-700">
                      {i18n.language === "ar" ? (service.name_ar || service.name_en) : (service.name_en || service.name_ar)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Property Types */}
          {/* {project.property_types && project.property_types.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                {t("properties.propertyType")}
              </h4>
              <div className="space-y-3">
                {project.property_types.map((propertyType) => (
                  <div
                    key={propertyType.id}
                    className="bg-gray-50 p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {propertyType.image && (
                        <img
                          src={propertyType.image}
                          alt={propertyType.type}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div>
                        <h5 className="font-semibold text-gray-800 capitalize">
                          {propertyType.type}
                        </h5>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">{t("filters.area")}:</span>
                        <span className="font-bold ml-1 text-blue-900">
                          {propertyType.area_min}-{propertyType.area_max} m²
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">{t("property.price")}:</span>
                        <span className="font-bold ml-1 text-blue-900">
                          ${propertyType.price_min?.toLocaleString()}-$
                          {propertyType.price_max?.toLocaleString()}
                        </span>
                      </div>
                      {propertyType.no_of_bedrooms_min && (
                        <div>
                          <span className="text-gray-500">{t("property.bedrooms")}:</span>
                          <span className="font-bold ml-1 text-blue-900">
                            {propertyType.no_of_bedrooms_min}-
                            {propertyType.no_of_bedrooms_max}
                          </span>
                        </div>
                      )}
                      {propertyType.no_of_bathrooms_min && (
                        <div>
                          <span className="text-gray-500">{t("property.bathrooms")}:</span>
                          <span className="font-bold ml-1 text-blue-700">
                            {propertyType.no_of_bathrooms_min}-
                            {propertyType.no_of_bathrooms_max}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )} */}

          {/* Gallery */}
          {project.galleries && project.galleries.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                {t("projects.Images")}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {project.galleries.map((gallery) => (
                  <div key={gallery.id} className="relative">
                    {gallery.type === "image" ? (
                      <img
                        src={gallery.url}
                        alt={t("blog.blogPost")}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ) : (
                      <video
                        src={gallery.url}
                        className="w-full h-32 object-cover rounded-lg"
                        controls
                      />
                    )}
                    <span className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      {gallery.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex gap-3 justify-end border-t">
          <button
            onClick={() => {
              onEdit(project);
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaEdit />
            {t("projects.editProject")}
          </button>
          <button
            onClick={() => {
              onDelete(project);
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <FaTrash />
            {t("projects.deleteProject")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;
