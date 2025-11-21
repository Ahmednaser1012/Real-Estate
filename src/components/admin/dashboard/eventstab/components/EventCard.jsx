import React from "react";
import { BiEdit, BiTrash, BiCalendar, BiTime, BiMapPin, BiCategory } from "react-icons/bi";

const EventCard = ({ event, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
      {/* Image Container */}
      <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title_en || event.title_ar}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
            <BiCalendar className="w-12 h-12 text-gray-300" />
          </div>
        )}
        
        {/* Overlay with Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <button
            onClick={() => onEdit(event)}
            className="p-3 bg-white rounded-full hover:bg-blue-500 hover:text-white transition-all duration-200 shadow-lg transform hover:scale-110"
            title="Edit Event"
          >
            <BiEdit className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(event.id)}
            className="p-3 bg-white rounded-full hover:bg-red-500 hover:text-white transition-all duration-200 shadow-lg transform hover:scale-110"
            title="Delete Event"
          >
            <BiTrash className="w-5 h-5" />
          </button>
        </div>

        {/* Category Badge */}
        {event.category && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full shadow-md">
              <BiCategory className="w-3 h-3" />
              {event.category}
            </span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-5 space-y-4">
        {/* Title Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {event.title_en || event.title_ar || "Untitled Event"}
          </h3>
          {event.title_ar && event.title_en && (
            <p className="text-sm text-gray-600 line-clamp-1 font-medium" dir="rtl">
              {event.title_ar}
            </p>
          )}
        </div>

        {/* Description */}
        {(event.description_en || event.description_ar) && (
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <p className="text-sm text-gray-700 line-clamp-2">
              {event.description_en || event.description_ar}
            </p>
          </div>
        )}

        {/* Event Details Grid */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          {/* Date */}
          {event.date && (
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                <BiCalendar className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-medium">Date</p>
                <p className="text-sm font-semibold text-gray-900">{formatDate(event.date)}</p>
              </div>
            </div>
          )}

          {/* Time */}
          {(event.start_time || event.end_time) && (
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg">
                <BiTime className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-medium">Time</p>
                <p className="text-sm font-semibold text-gray-900">
                  {event.start_time}
                  {event.end_time && ` - ${event.end_time}`}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>
            Created: {event.created_at ? formatDate(event.created_at) : "N/A"}
          </span>
          <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-600 font-medium">
            ID: {event.id}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
