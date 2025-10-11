import { focus } from "../../../data/dummyData";
import { useTranslation } from "react-i18next";

const WhatWeDo = () => {
  const { t } = useTranslation();

  // Map focus items to translation keys
  const focusItems = [
    { id: 1, icon: focus[0].icon, translationKey: "buyHome" },
    { id: 2, icon: focus[1].icon, translationKey: "sellHome" },
    { id: 3, icon: focus[2].icon, translationKey: "rentHome" }
  ];

  return (
    <div className="py-16">
      <div className="text-center">
        <h1 className="mx-auto sub-heading">{t("about.whatWeDo.subHeading")}</h1>
        <h1 className="heading">{t("about.whatWeDo.heading")}</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2 md:grid-cols-3">
        {focusItems.map(({ id, icon, translationKey }) => (
          <div
            className="p-3 text-center rounded-lg group hover:card-shadow hover:border-t-4 hover:border-t-primary dark:hover:bg-card-dark"
            key={id}
          >
            <div className="icon-box !opacity-100 !w-14 !h-14 mx-auto !bg-primary/20 text-primary hover:!bg-primary hover:text-white">
              <div className="text-2xl"> {icon}</div>
            </div>
            <h1 className="mt-2 heading !text-xl">{t(`about.whatWeDo.items.${translationKey}.name`)}</h1>
            <p className="mt-2">{t(`about.whatWeDo.items.${translationKey}.text`)}</p>
            <div className="hidden mt-4 group-hover:flex-center-center ">
              <button className="btn btn-primary">{t("about.whatWeDo.viewMoreDetails")}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatWeDo;
