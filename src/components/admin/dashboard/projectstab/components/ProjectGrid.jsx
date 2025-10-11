import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdEdit, MdDelete, MdApartment } from "react-icons/md";
import { BiBuildings, BiArea } from "react-icons/bi";

const ProjectGrid = ({ projects, onView, onEdit, onDelete }) => {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🏢</div>
        <p className="text-gray-500 text-lg">No projects found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {projects.map((project, index) => (
        <motion.div
          key={project.id || `project-${index}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ y: -5 }}
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
          onClick={() => onView(project)}
        >
          {/* Project Image */}
          <div className="relative h-48 bg-gray-200">
            {project.master_plan ? (
              <img
                src={project.master_plan}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
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
                {project.type}
              </span>
            </div>
          </div>

          {/* Project Info */}
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {project.description}
            </p>

            <div className="flex items-center text-sm mb-3">
              <FaMapMarkerAlt className="mr-2 text-red-500" />
              <span className="truncate text-gray-700 font-medium">
                {project.area?.name_en || "N/A"},{" "}
                {project.city?.name_en || "N/A"}
              </span>
            </div>

            <div className="grid grid-cols-2 mb-4 text-sm">
              <div className=" p-2.5 rounded-lg border border-blue-200">
                <div className="flex items-center gap-1.5">
                  <BiArea className="text-blue-600 text-lg" />
                  <span className="text-gray-600 text-xs">Area:</span>
                  <span className="font-bold text-blue-700 block mt-1">
                    {project.project_area || project.ProjectArea || "N/A"} m²
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(project);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <MdEdit />
                <span className="text-sm font-medium">Edit</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(project);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                <MdDelete />
                <span className="text-sm font-medium">Delete</span>
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProjectGrid;
