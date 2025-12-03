import { useTranslation } from "react-i18next";
import { useGetAllEventsQuery } from "../../../features/eventsApi";
import EventsGrid from "../../common/page-componets/EventsGrid";
import { Calendar } from "lucide-react";

const UpcomingEvents = () => {
  const { t } = useTranslation();
  const { data: events = [], isLoading, error } = useGetAllEventsQuery({ 
    limit: 2, 
    offset: 0, 
    sort: "DESC", 
    sortBy: "id" 
  });

  if (isLoading) {
    return (
      <div className="py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">{t('events.loadingEvents')}</p>
        </div>
      </div>
    );
  }

  if (error || events.length === 0) {
    return null;
  }

  return (
    <div className="py-16">
      {/* Section Header */}
      <div className="text-center max-w-[400px] mx-auto ">
        <h1 className="mx-auto sub-heading">{t('events.subHeading')}</h1>
        <h1 className="heading mb-3">{t('events.heading')}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('events.description')}
        </p>
      </div>

      {/* Events Grid - Centered */}
      <EventsGrid events={events} centered={true} />
    </div>
  );
};

export default UpcomingEvents;
