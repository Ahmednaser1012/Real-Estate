import React from "react";
import { BiEdit, BiTrash, BiCalendar, BiDollarCircle, BiMapPin, BiBriefcase } from "react-icons/bi";
import { useTranslation } from "react-i18next";

const CareerCard = ({ career, onEdit, onDelete }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const getTypeColor = (type) => {
    const colors = {
      "Full-time": "bg-green-100 text-green-700",
      "Part-time": "bg-blue-100 text-blue-700",
      "Contract": "bg-orange-100 text-orange-700",
      "Temporary": "bg-yellow-100 text-yellow-700",
      "Internship": "bg-purple-100 text-purple-700",
    };
    return colors[type] || "bg-gray-100 text-gray-700";
  };

  const getTypeLabel = (type) => {
    const typeMap = {
      "Full-time": t("career.fullTime"),
      "Part-time": t("career.partTime"),
      "Contract": "Contract",
      "Temporary": "Temporary",
      "Internship": t("career.internship"),
    };
    return typeMap[type] || type;
  };

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200">
      {/* Image Container */}
      <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {career.image ? (
          <img
            src={career.image}
            alt={career.title_en || career.title_ar}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
            <BiBriefcase className="w-12 h-12 text-gray-300" />
          </div>
        )}
        
        {/* Overlay with Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <button
            onClick={() => onEdit(career)}
            className="p-3 bg-white rounded-full hover:bg-green-500 hover:text-white transition-all duration-200 shadow-lg transform hover:scale-110"
            title="Edit Career"
          >
            <BiEdit className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(career.id, career.title_en || career.title_ar)}
            className="p-3 bg-white rounded-full hover:bg-red-500 hover:text-white transition-all duration-200 shadow-lg transform hover:scale-110"
            title="Delete Career"
          >
            <BiTrash className="w-5 h-5" />
          </button>
        </div>

        {/* Type Badge */}
        {career.type && (
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full shadow-md ${getTypeColor(career.type)}`}>
              <BiBriefcase className="w-3 h-3" />
              {getTypeLabel(career.type)}
            </span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-5 space-y-4">
        {/* Title Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-green-600 transition-colors">
            {(isArabic ? career.title_ar : career.title_en) || "Untitled Position"}
          </h3>
        </div>

        {/* Description */}
        {(isArabic ? career.description_ar : career.description_en) && (
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <p className="text-sm text-gray-700 line-clamp-2">
              {isArabic ? career.description_ar : career.description_en}
            </p>
          </div>
        )}

        {/* Career Details Grid */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          {/* Department */}
          {career.department && (
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                <BiBriefcase className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-medium">{t("career.department")}</p>
                <p className="text-sm font-semibold text-gray-900">{career.department}</p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>
            {t("career.created")}: {career.created_at ? formatDate(career.created_at) : "N/A"}
          </span>
          <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-600 font-medium">
            ID: {career.id}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CareerCard;
