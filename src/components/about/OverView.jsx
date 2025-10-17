import { BiPlay } from "react-icons/bi";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import video1 from "../../../src/assets/HomePage/video1.mp4";

const OverView = () => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <div className="pt-20 pb-16">
      {/* Vision & Mission Section */}
      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-primary mb-4">
              {t("about.overview.vision.title")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t("about.overview.vision.description")}
            </p>
          </div>

          {/* Mission */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-primary mb-4">
              {t("about.overview.mission.title")}
            </h2>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>{t("about.overview.mission.point1")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>{t("about.overview.mission.point2")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>{t("about.overview.mission.point3")}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 basis-[18rem] mt-16">
          <h1 className="heading">{t("about.overview.heading")}</h1>
          <p className="mt-3">{t("about.overview.description")}</p>
        </div>
        <div className="flex-1 basis-[18rem]">
          <div className="relative overflow-hidden rounded-lg">
            {!isPlaying ? (
              <>
                <img
                  src="/images/property (41).png"
                  alt="Overview"
                  className="w-full h-[300px] object-cover"
                />
                <div
                  className="absolute top-0 left-0 flex-col w-full h-full bg-black/50 flex-center-center cursor-pointer"
                  onClick={handlePlayVideo}
                >
                  <div className="icon-box !text-primary !bg-transparent border !border-primary relative before:absolute before:w-full before:h-full before:rounded-full before:animate-ping before:bg-primary/60">
                    <BiPlay className="text-2xl" />
                  </div>
                  <h1 className="mt-3 text-3xl font-semibold text-white capitalize">
                    {t("about.overview.watchOverview")}
                  </h1>
                </div>
              </>
            ) : (
              <div className="w-full h-[300px] bg-black flex items-center justify-center">
                <video
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  src={video1}
                  onError={(e) => {
                    console.error("Video failed to load");
                    setIsPlaying(false);
                  }}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
