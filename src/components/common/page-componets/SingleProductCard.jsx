import { useTranslation } from "react-i18next";
import { BiBed, BiMap, BiTab } from "react-icons/bi";
import { Link } from "react-router-dom";
import CardHoverIcons from "./CardHoverIcons";
import CardLabels from "./CardLabels";

const SingleProductCard = ({
  // Common fields
  id,
  // Old property fields
  name,
  location,
  price,
  distance,
  purpose,
  number_of_beds,
  number_of_bathrooms,
  image,
  basis,
  // New project fields
  title,
  title_ar,
  title_en,
  description,
  description_ar,
  description_en,
  ProjectArea,
  type,
  city,
  area,
  galleries,
  masterPlan,
}) => {
  const { t, i18n } = useTranslation();
  
  // Use project data if available, otherwise use property data
  // Select title based on language
  const displayTitle = 
    i18n.language === "ar" 
      ? (title_ar || title || name)
      : (title_en || title || name);
  
  const displayLocation = location || (city && area ? `${city?.name || city}, ${area?.name || area}` : t("property.locationNotSpecified"));
  const displayImage = galleries?.[0]?.url || masterPlan || image || '/images/property (1).jpg';
  const displayType = type || purpose;
  const displayArea = ProjectArea || distance;
  
  // Select description based on language
  const displayDescription = 
    i18n.language === "ar" 
      ? (description_ar || description)
      : (description_en || description);
  
  const isProject = !!title; // Check if it's a project
  const itemId = title ? id : id; // Use id for both

  return (
    <div
      className="shadow-light dark:border-card-dark border rounded-lg overflow-hidden relative group h-full"
    >
      <div className="group !opacity-100 overflow-hidden relative">
        <Link to={`/projects/${itemId}`} className="!opacity-100">
          <img
            src={displayImage}
            alt={displayTitle}
            className="w-full  h-fit md:h-[250px] object-cover group-hover:scale-125 transition-a"
          />
        </Link>
        <CardHoverIcons />
        <div className="absolute bottom-0 left-0 w-full px-2 py-2 transition-transform bg-gradient-to-t from-black/80 sm:translate-y-10 group-hover:translate-y-0 to-transparent">
          <div className="text-white flex-align-center gap-x-2">
            <BiMap />
            <p className="text-sm truncate">{displayLocation}</p>
          </div>
        </div>
      </div>
      <CardLabels purpose={displayType} distance={displayArea} />
      <div className="p-3">
        <Link to={`/projects/${itemId}`} className="group-hover:text-primary transition-a">
          <h1 className="text-lg font-bold capitalize line-clamp-2">{displayTitle}</h1>
        </Link>
        
        {displayDescription && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
            {displayDescription}
          </p>
        )}

        {/* {(number_of_beds || number_of_bathrooms) && (
          <div className="flex justify-between mt-3">
            {number_of_beds && (
              <div className="flex-align-center gap-x-2">
                <div className="icon-box !w-7 !h-7 bg-primary/20 hover:!bg-primary/40 text-primary">
                  <BiBed />
                </div>
                <p className="text-sm">{number_of_beds} {t("property.bedrooms")}</p>
              </div>
            )}
            {number_of_bathrooms && (
              <div className="flex-align-center gap-x-2">
                <div className="icon-box !w-7 !h-7 bg-primary/20 hover:!bg-primary/40 text-primary">
                  <BiTab />
                </div>
                <p className="text-sm">{number_of_bathrooms} {t("property.bathrooms")}</p>
              </div>
            )}
          </div>
        )} */}

        <div className="mt-4 flex-center-between">
          {price && <h1 className="text-lg font-semibold text-primary">{price}</h1>}
          <Link to={ `/projects/${itemId}`}>
            <button className="btn btn-secondary">{t("property.viewDetails")}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCard;
