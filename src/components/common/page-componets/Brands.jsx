import { brands } from "../../../data/dummyData";
import { useTranslation } from "react-i18next";

const Brands = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-6 pb-10">
      <div className="text-center max-w-[400px] mx-auto">
      <h1 className="mx-auto sub-heading">{t("about.partners.subHeading")}</h1>
      <h1 className="heading">{t("about.partners.heading")}</h1>
      <p>
      {t("about.partners.description")}
      </p>
      </div>
      <div className="flex-wrap p-4 mt-8 flex-center-center gap-x-16 gap-y-5">
        {brands.map((image, i) => (
          <div className="group" key={i}>
            <img
              src={image}
              alt=""
              className="w-20 group-hover:scale-125 transition-a"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
