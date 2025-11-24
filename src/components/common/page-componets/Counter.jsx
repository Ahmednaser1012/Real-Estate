import { useTranslation } from "react-i18next";

const Counter = () => {
  const { t } = useTranslation();
  return (
    <div className="flex-wrap justify-center gap-4 px-4 py-8 flex-align-center sm:justify-between bg-secondary">
      <div className="text-center">
        <h1 className="heading !text-slate-100">12k+</h1>
        <p className="text-slate-100">{t('counter.renovationProjects')}</p>
      </div>
      <div className="text-center">
        <h1 className="heading !text-slate-100">100+</h1>
        <p className="text-slate-100">{t('counter.teamMembers')}</p>
      </div>
      <div className="text-center">
        <h1 className="heading !text-slate-100">15k+</h1>
        <p className="text-slate-100">{t('counter.projectsCompleted')}</p>
      </div>
      <div className="text-center">
        <h1 className="heading !text-slate-100">100%</h1>
        <p className="text-slate-100">{t('counter.satisfiedClients')}</p>
      </div>
    </div>
  );
};

export default Counter;
