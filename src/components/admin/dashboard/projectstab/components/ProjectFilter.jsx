import React from "react";
import { useTranslation } from "react-i18next";

const ProjectFilter = ({ activeFilter, onFilterChange }) => {
  const { t } = useTranslation();

  const filters = [
    { id: "all", label: t("common.viewAll") },
    { id: "residential", label: t("enums.projectTypes.residential") },
    { id: "commercial", label: t("enums.projectTypes.commercial") },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeFilter === filter.id
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilter;
