import { useTranslation } from "react-i18next";

const EventsHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('events.title')}</h1>
        <p className="text-white/80 text-lg">{t('events.subtitle')}</p>
      </div>
    </div>
  );
};

export default EventsHeader;
