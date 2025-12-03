import { useTranslation } from "react-i18next";

const CardLabels = ({ purpose, distance }) => {
  const { t, i18n } = useTranslation();

  // Translate purpose based on project type
  const translatePurpose = (type) => {
    if (!type) return "";
    const typeStr = String(type).toLowerCase();
    if (typeStr.includes("residential")) return t("enums.projectTypes.residential");
    if (typeStr.includes("commercial")) return t("enums.projectTypes.commercial");
    return type;
  };

  return (
    <div className="absolute top-2 left-2 flex-align-center gap-x-2">
      {/* <span className="py-[3px] px-3 text-sm rounded-full capitalize text-white bg-primary">
        {distance} away
      </span> */}
      <span className="py-[3px] px-3 text-sm rounded-full capitalize text-white bg-secondary">
        {translatePurpose(purpose)}
      </span>
    </div>
  );
};

export default CardLabels;
