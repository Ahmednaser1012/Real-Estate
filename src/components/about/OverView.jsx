import { BiPlay } from "react-icons/bi";
import { useTranslation } from "react-i18next";

const OverView = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-20 pb-16">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 basis-[18rem]">
          <h1 className="heading">{t("about.overview.heading")}</h1>
          <p className="mt-3">
            {t("about.overview.description")}
          </p>
          <button className="mt-4 btn btn-primary">{t("about.overview.readMore")}</button>
        </div>
        <div className="flex-1 basis-[18rem]">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src="/images/property (41).png"
              alt=""
              className="w-full h-[300px] object-cover"
            />
            <div className="absolute top-0 left-0 flex-col w-full h-full bg-black/50 flex-center-center">
              <div className="icon-box !text-primary !bg-transparent border !border-primary relative before:absolute before:w-full before:h-full before:rounded-full before:animate-ping before:bg-primary/60">
                <BiPlay className="text-2xl" />
              </div>
              <h1 className="mt-3 text-3xl font-semibold text-white capitalize">
                {t("about.overview.watchOverview")}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
