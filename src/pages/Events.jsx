 import { Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useGetAllEventsQuery } from "../features/eventsApi";
import EventsHeader from "../components/common/page-componets/EventsHeader";
import EventsGrid from "../components/common/page-componets/EventsGrid";

export default function Events() {
  const { t } = useTranslation();
  const { data: events = [], isLoading, error } = useGetAllEventsQuery({ limit: 50 });

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300 text-lg">{t('events.loadingEvents')}</p>
        </div>
      </div>
    );
  }

  if (error || events.length === 0) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Calendar className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-700 dark:text-gray-300 text-xl">{t('events.noEvents')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <EventsHeader />
      <EventsGrid events={events} />
    </div>
  );
}
