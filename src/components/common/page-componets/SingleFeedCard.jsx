import { BiCalendar, BiCategory } from "react-icons/bi";

const SingleFeedCard = ({
  id,
  title,
  date_posted,
  created_at,
  image,
  category,
  description,
}) => {
  // Use created_at if date_posted is not available (for API data)
  const displayDate = date_posted || created_at;

  return (
    <div className="flex-1 basis-[18rem] shadow-light dark:border-card-dark border rounded-lg overflow-hidden relative group h-[600px] flex flex-col">
      {/* Image Section */}
      <div className="flex-shrink-0 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-[200px] object-cover group-hover:scale-125 transition-transform duration-300"
        />
      </div>

      {/* Content Section - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col">
        {/* Category Badge */}
        {category && (
          <div className="mb-3 flex-shrink-0">
            <span className="px-3 py-1 text-white capitalize rounded-full bg-secondary inline-flex items-center gap-2 text-sm">
              <BiCategory className="w-4 h-4" />
              {category}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-lg font-semibold capitalize mb-3 text-gray-900 dark:text-white break-words">
          {title}
        </h1>

        {/* Date Info */}
        {displayDate && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4 pb-4 border-b border-gray-200 dark:border-card-dark flex-shrink-0">
            <BiCalendar className="w-4 h-4" />
            <span className="capitalize">{displayDate}</span>
          </div>
        )}

        {/* Description */}
        <div className="flex-1">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line break-words text-sm">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleFeedCard;
