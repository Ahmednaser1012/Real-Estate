import { useState } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useGetAllEventsQuery } from "../features/eventsApi";

export default function Events() {
  const { data: events = [], isLoading, error } = useGetAllEventsQuery({ limit: 50 });

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen   flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300 text-lg">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error || events.length === 0) {
    return (
      <div className="pt-20 min-h-screen   flex items-center justify-center">
        <div className="text-center">
          <Calendar className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-700 dark:text-gray-300 text-xl">No events available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20  min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Events</h1>
          <p className="text-white/80 text-lg">Discover our upcoming events and activities</p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-card-dark rounded-lg shadow-light dark:shadow-none hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-primary/20 transition-all duration-300 overflow-hidden border border-light dark:border-dark-light group"
            >
              {/* Image */}
              {event.image && (
                <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title_en || event.title_ar}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Title */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {event.title_en || event.title_ar}
                  </h3>
                  {event.title_ar && event.title_en && (
                    <p className="text-sm text-gray-600 dark:text-gray-400" dir="rtl">
                      {event.title_ar}
                    </p>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-3 text-sm">
                  {event.date && (
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  )}

                  {event.start_time && (
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <Clock className="w-4 h-4 text-secondary flex-shrink-0" />
                      <span>
                        {event.start_time}
                        {event.end_time && ` - ${event.end_time}`}
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                {(event.description_en || event.description_ar) && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                    {event.description_en || event.description_ar}
                  </p>
                )}

                {/* Button */}
                <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 font-semibold flex items-center justify-center gap-2 group/btn">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
