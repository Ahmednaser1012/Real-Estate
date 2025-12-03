import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const EventsGrid = ({ events, centered = false }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/events");
  };

  return (
    <div className={`${centered ? 'px-4 py-16' : 'max-w-7xl mx-auto px-4 py-16'}`}>
      <div className={`grid ${centered ? 'grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'}`}>
        {events.map((event) => (
          <div
            key={event.id}
            onClick={handleCardClick}
            className="bg-white dark:bg-card-dark rounded-lg shadow-light dark:shadow-none hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-primary/20 transition-all duration-300 overflow-hidden border border-light dark:border-dark-light group cursor-pointer"
          >
            {/* Image */}
            {event.image && (
              <div className="h-80 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <img
                  src={event.image}
                  alt={i18n.language === 'ar' ? (event.title_ar || event.title_en) : (event.title_en || event.title_ar)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Title */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
                  {i18n.language === 'ar' ? (event.title_ar || event.title_en) : (event.title_en || event.title_ar)}
                </h3>
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
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
                  {i18n.language === 'ar' ? (event.description_ar || event.description_en) : (event.description_en || event.description_ar)}
                </p>
              )}

              {/* Button */}
              {/* <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 font-semibold flex items-center justify-center gap-2 group/btn">
                Learn More
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsGrid;
