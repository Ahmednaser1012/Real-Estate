import React from "react";
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
  if (!isOpen || !project) return null;

  console.log("Project Details:", project);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Project Details</h2>
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
            {project.masterPlan ? (
              <img
                src={project.masterPlan}
                alt={project.title}
                className="w-full h-64 object-cover rounded-lg"
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
              {project.title}
            </h3>
            <div className="flex items-center text-gray-600 mb-4">
              <FaMapMarkerAlt className="mr-2" />
              <span>
                {project.area?.name_en || "N/A"},{" "}
                {project.city?.name_en || "N/A"}
              </span>
            </div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                project.type === "residential"
                  ? "bg-green-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {project.type}
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Description
            </h4>
            <p className="text-gray-600">{project.description}</p>
          </div>

          {/* Meta Information */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Meta Title
              </h4>
              <p className="text-gray-600">{project.metaTitle || "N/A"}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Meta Description
              </h4>
              <p className="text-gray-600">
                {project.metaDescription || "N/A"}
              </p>
            </div>
          </div>

          {/* Project Area */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Project Area
            </h4>
            <p className="text-gray-600">{project.ProjectArea || "N/A"} m²</p>
          </div>

          {/* Location URL */}
          {project.location && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Location
              </h4>
              <a
                href={project.location}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
              >
                <FaLink />
                View on Map
              </a>
            </div>
          )}

          {/* Services */}
          {project.services && project.services.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Services & Amenities
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
                        alt={service.name_en}
                        className="w-8 h-8 object-cover rounded"
                      />
                    )}
                    <span className="text-sm text-gray-700">
                      {service.name_en}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Property Types */}
          {project.property_types && project.property_types.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Property Types
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
                        <span className="text-gray-500">Area:</span>
                        <span className="font-bold ml-1 text-blue-900">
                          {propertyType.area_min}-{propertyType.area_max} m²
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Price:</span>
                        <span className="font-bold ml-1 text-blue-900">
                          ${propertyType.price_min?.toLocaleString()}-$
                          {propertyType.price_max?.toLocaleString()}
                        </span>
                      </div>
                      {propertyType.no_of_bedrooms_min && (
                        <div>
                          <span className="text-gray-500">Bedrooms:</span>
                          <span className="font-bold ml-1 text-blue-900">
                            {propertyType.no_of_bedrooms_min}-
                            {propertyType.no_of_bedrooms_max}
                          </span>
                        </div>
                      )}
                      {propertyType.no_of_bathrooms_min && (
                        <div>
                          <span className="text-gray-500">Bathrooms:</span>
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
          )}

          {/* Gallery */}
          {project.galleries && project.galleries.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Gallery
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {project.galleries.map((gallery) => (
                  <div key={gallery.id} className="relative">
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
            Edit Project
          </button>
          <button
            onClick={() => {
              onDelete(project);
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <FaTrash />
            Delete Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;
