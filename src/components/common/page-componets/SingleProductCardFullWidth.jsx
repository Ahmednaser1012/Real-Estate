import { BiBed, BiMap, BiMapAlt, BiTab } from "react-icons/bi";
import { Link } from "react-router-dom";
import CardHoverIcons from "./CardHoverIcons";
import CardLabels from "./CardLabels";

const SingleProductCardFullWidth = ({
  // Common fields
  id,
  // Old property fields
  name,
  location,
  price,
 
  purpose,
  number_of_beds,
  number_of_bathrooms,
  image,
  description,
  textLength,
  showLabels,
 
  title,
 
  type,
  city,
  area,
  galleries,
  masterPlan,
}) => {
  // Use project data if available, otherwise use property data
  const displayTitle = title || name;
  const displayLocation = location || (city && area ? `${city?.name || city}, ${area?.name || area}` : 'Location not specified');
  const displayImage = galleries?.[0]?.url || masterPlan || image || '/images/property (1).jpg';
  const displayType = type || purpose;
  const displayDescription = description || 'No description available';
  const isProject = !!title;

  return (
    <div className="relative grid grid-cols-1 gap-3 mt-3 overflow-hidden border rounded-lg shadow-light sm:grid-cols-3 md:grid-cols-4 dark:border-card-dark group">
      <div className="sm:col-span-1">
        <div className="group !opacity-100 overflow-hidden relative h-full">
          <Link to={isProject ? `/projects/${id}` : `/property/${id}`} className="!opacity-100">
            <img
              src={displayImage}
              alt={displayTitle}
              className="object-cover w-full h-full group-hover:scale-125 transition-a"
            />
          </Link>
          <CardHoverIcons />
        </div>
        {!showLabels && <CardLabels purpose={displayType} />}
      </div>
      <div className="sm:col-span-2 md:col-span-3">
        <div className="p-3">
          <Link to={isProject ? `/projects/${id}` : `/property/${id}`} className="group-hover:text-primary transition-a">
            <h1 className="text-lg font-bold capitalize">{displayTitle}</h1>
          </Link>

          <div className="mt-2 flex-align-center gap-x-2">
            <BiMap />
            <p className="text-sm">{displayLocation}</p>
          </div>
          
          {displayDescription && (
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {displayDescription.length > (textLength || 180)
                ? `${displayDescription.slice(0, textLength || 180)}...`
                : displayDescription}
            </p>
          )}

          {(number_of_beds || number_of_bathrooms) && (
            <div className="flex justify-between mt-3">
              {number_of_beds && (
                <div className="flex-align-center gap-x-2">
                  <div className="icon-box !w-7 !h-7 bg-primary/20 hover:!bg-primary/40 text-primary">
                    <BiBed />
                  </div>
                  <p className="text-sm">{number_of_beds} Beds</p>
                </div>
              )}
              {number_of_bathrooms && (
                <div className="flex-align-center gap-x-2">
                  <div className="icon-box !w-7 !h-7 bg-primary/20 hover:!bg-primary/40 text-primary">
                    <BiTab />
                  </div>
                  <p className="text-sm">{number_of_bathrooms} Bathrooms</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-4 flex-center-between">
            {price && <h1 className="text-lg font-semibold text-primary">{price}</h1>}
            <Link to={isProject ? `/projects/${id}` : `/property/${id}`}>
              <button className="btn btn-secondary">details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCardFullWidth;
