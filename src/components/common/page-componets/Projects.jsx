import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { projects } from "../../../data/dummyData";

const Projects = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div className="pt-10 pb-16">
      <div className="text-center">
        <h1 className="mx-auto sub-heading">{t("projects.management")}</h1>
        <h1 className="heading">{t("projects.totalProjects")}</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 md:grid-cols-3">
        {projects.map(({ id, name, number, image }) => (
          <div key={id} className="relative w-full group">
            <div className="overflow-hidden">
              <Link className="!opacity-100">
                <img
                  src={image}
                  alt={name}
                  className="w-full  h-fit md:h-[250px] object-cover group-hover:scale-125 transition-a"
                />
              </Link>
            </div>
            <div className={`absolute bottom-0 left-0 w-full px-2 py-2 transition-transform bg-gradient-to-t from-black/80 text-slate-100 to-transparent ${isRTL ? "text-right" : "text-left"}`} dir={isRTL ? "rtl" : "ltr"}>
              <h1 className="text-lg font-semibold capitalize">{name}</h1>
              <p>{number} {t("property.forSale")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
