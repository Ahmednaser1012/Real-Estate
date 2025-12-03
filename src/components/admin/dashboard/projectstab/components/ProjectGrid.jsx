import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdEdit, MdDelete, MdApartment } from "react-icons/md";
import { BiBuildings, BiArea } from "react-icons/bi";

const ProjectGrid = ({ projects, onView, onEdit, onDelete }) => {
  const { t, i18n } = useTranslation();

  if (projects.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mb-4 text-6xl text-gray-400">🏢</div>
        <p className="text-lg text-gray-500">{t("projects.noProjectsFound")}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project, index) => (
        <motion.div
          key={project.id || `project-${index}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ y: -5 }}
          className="overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-xl"
          onClick={() => onView(project)}
        >
          {/* Project Image */}
          <div className="relative h-96 bg-gray-200">
            {project.master_plan ? (
              <img
                src={project.master_plan}
                alt={project.title_en || project.title_ar}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <BiBuildings className="text-6xl text-gray-400" />
              </div>
            )}
            <div className="absolute top-2 right-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  project.type === "residential"
                    ? "bg-green-500 text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                {t(`enums.projectTypes.${project.type}`)}
              </span>
            </div>
          </div>

          {/* Project Info */}
          <div className="p-4">
            <h3 className="mb-2 text-lg font-bold text-gray-800 truncate">
              {i18n.language === "ar" ? (project.title_ar || project.title_en || "N/A") : (project.title_en || project.title_ar || "N/A")}
            </h3>
            <p className="mb-3 text-sm text-gray-600 line-clamp-2">
              {i18n.language === "ar" ? (project.description_ar || project.description_en || "N/A") : (project.description_en || project.description_ar || "N/A")}
            </p>

            <div className="flex items-center mb-3 text-sm">
              <FaMapMarkerAlt className="mr-2 text-red-500" />
              <span className="font-medium text-gray-700 truncate">
                {typeof project.area === 'object' ? (i18n.language === "ar" ? project.area?.name_ar : project.area?.name_en) : project.area || "N/A"},{" "}
                {typeof project.city === 'object' ? (i18n.language === "ar" ? project.city?.name_ar : project.city?.name_en) : project.city || "N/A"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
              <div className="p-2.5 rounded-lg border border-blue-200">
                <div className="flex items-center gap-1.5">
                  <BiArea className="text-lg text-blue-600" />
                  <span className="text-xs text-gray-600">{t("filters.area")}:</span>
                  <span className="block mt-1 font-bold text-blue-700">
                    {project.project_area || "N/A"} m²
                  </span>
                </div>
              </div>
              {project.delivery_date && (
                <div className="p-2.5 rounded-lg border border-green-200">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-gray-600">{t("events.date")}:</span>
                    <span className="block mt-1 font-bold text-green-700">
                      {new Date(project.delivery_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(project);
                }}
                className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100"
              >
                <MdEdit />
                <span className="text-sm font-medium">{t("common.edit")}</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(project);
                }}
                className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-red-600 transition-colors rounded-lg bg-red-50 hover:bg-red-100"
              >
                <MdDelete />
                <span className="text-sm font-medium">{t("common.delete")}</span>
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProjectGrid;
