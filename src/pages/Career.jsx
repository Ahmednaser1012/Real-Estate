import { useState } from "react";
import { Briefcase, MapPin, DollarSign, Clock, ArrowRight } from "lucide-react";
import { useGetAllCareersQuery } from "../features/careersApi";

export default function Career() {
  const { data: careers = [], isLoading, error } = useGetAllCareersQuery({ limit: 50 });

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300 text-lg">Loading career opportunities...</p>
        </div>
      </div>
    );
  }

  if (error || careers.length === 0) {
    return (
      <div className="pt-20 min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <Briefcase className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-700 dark:text-gray-300 text-xl">No career opportunities available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-white/80 text-lg">Explore exciting career opportunities</p>
        </div>
      </div>

      {/* Careers Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {careers.map((career) => (
            <div
              key={career.id}
              className="bg-white dark:bg-card-dark rounded-lg shadow-light dark:shadow-none hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-primary/20 transition-all duration-300 overflow-hidden border border-light dark:border-dark-light group"
            >
              {/* Image */}
              {career.image && (
                <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <img
                    src={career.image}
                    alt={career.title_en || career.title_ar}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Title */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {career.title_en || career.title_ar}
                  </h3>
                  {career.title_ar && career.title_en && (
                    <p className="text-sm text-gray-600 dark:text-gray-400" dir="rtl">
                      {career.title_ar}
                    </p>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-3 text-sm">
                  

                  {career.type && (
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <Clock className="w-4 h-4 text-secondary flex-shrink-0" />
                      <span className="capitalize">{career.type}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                {(career.description_en || career.description_ar) && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                    {career.description_en || career.description_ar}
                  </p>
                )}

                {/* Button */}
                <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 font-semibold flex items-center justify-center gap-2 group/btn">
                  Apply Now
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
