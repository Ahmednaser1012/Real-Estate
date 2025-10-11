import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { BiX, BiCalendar, BiCategory } from "react-icons/bi";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex-1 basis-[18rem] shadow-light dark:border-card-dark border rounded-lg overflow-hidden relative group">
        <div className="group !opacity-100 overflow-hidden">
          <button onClick={handleOpenModal} className="!opacity-100 w-full">
            <img
              src={image}
              alt={title}
              className="w-full rounded-lg h-fit md:h-[200px] object-cover group-hover:scale-125 transition-a"
            />
          </button>
        </div>

        <div className="p-3">
          <button
            onClick={handleOpenModal}
            className="group-hover:text-primary transition-a text-left w-full"
          >
            <h1 className="text-lg font-semibold capitalize">{title}</h1>
          </button>
          <button
            onClick={handleOpenModal}
            className="mt-4 flex-align-center gap-x-2 hover:underline text-primary"
          >
            <span className="uppercase hover:underline">read more</span>{" "}
            <FiArrowRight />
          </button>
        </div>
      </div>

      {/* Blog Details Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-start z-[9999] p-44 pt-[6%]  "
          onClick={handleCloseModal}
        >
          <div
            className="bg-white dark:bg-dark-light rounded-lg shadow-xl w-full max-w-3xl h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex-shrink-0 bg-white dark:bg-dark-light border-b border-gray-200 dark:border-card-dark p-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                Blog Details
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <BiX className="w-8 h-8" />
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Blog Image */}
              <div className="mb-6 rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-64 md:h-96 object-cover"
                />
              </div>

              {/* Category Badge */}
              {category && (
                <div className="mb-4">
                  <span className="px-4 py-2 text-white capitalize rounded-full bg-secondary inline-flex items-center gap-2">
                    <BiCategory className="w-4 h-4" />
                    {category}
                  </span>
                </div>
              )}

              {/* Blog Title */}
              <h1 className="text-3xl font-bold capitalize mb-4 text-gray-900 dark:text-white break-words">
                {title}
              </h1>

              {/* Author and Date Info */}
              {displayDate && (
                <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-card-dark">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <BiCalendar className="w-4 h-4" />
                    <span className="capitalize">{displayDate}</span>
                  </div>
                </div>
              )}

              {/* Blog Description */}
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line break-words">
                  {description}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex-shrink-0 flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-card-dark bg-white dark:bg-dark-light">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-card-dark hover:bg-gray-200 dark:hover:bg-dark rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleFeedCard;
