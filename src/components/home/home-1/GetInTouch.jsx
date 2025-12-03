import { useState } from "react";
import { useTranslation } from "react-i18next";
import video2 from "../../../assets/HomePage/video2.mp4";
import RegisterForm from "../../common/RegisterForm";
import { FiMail, FiArrowRight } from "react-icons/fi";

const GetInTouch = () => {
  const { t } = useTranslation();
  const [videoReady, setVideoReady] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const toggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };
  return (
    <div className="pt-10 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Media side with autoplaying video */}
        <div className="h-full w-full flex-1 basis-[18rem] relative group overflow-hidden">
          <video
            src={video2}
            autoPlay
            muted
            loop
            playsInline
            controls
            className={`w-full h-full object-fill transition-opacity transition-transform duration-700 ease-out ${
              videoReady ? "opacity-100" : "opacity-0"
            } `}
            onLoadedData={() => setVideoReady(true)}
          />
        </div>

        {/* Form side with header and button */}
        <div className="flex-1 basis-[18rem] bg-main-bg dark:bg-gray-900 py-6 flex items-center px-4">
          <div className="max-w-[350px] w-full mx-auto bg-white dark:bg-card-dark p-6 rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-1 focus-within:-translate-y-1 hover:shadow-xl border border-light dark:border-dark group">
            {/* Icon and heading side by side */}
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/20 text-primary group-hover:bg-primary/30 transition-all duration-300 flex-shrink-0">
                <FiMail className="text-2xl text-white" />
              </div>
              <h1 className="text-lg font-bold text-secondary dark:text-slate-200">{t("getInTouch.title")}</h1>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {t("getInTouch.description")}
            </p>

            {/* Decorative line */}
            <div className="mt-5 h-1 w-12 bg-gradient-to-r from-primary to-transparent rounded-full"></div>

            <button
              onClick={toggleRegisterForm}
              className="w-full mt-6 btn btn-primary flex items-center justify-center gap-2 group/btn"
            >
              {t("getInTouch.button")}
              <FiArrowRight className="text-lg group-hover/btn:translate-x-1 transition-transform duration-300" />
            </button>

            {/* Bottom accent */}
            <div className="mt-4 text-xs text-slate-500 dark:text-slate-400 text-center">
              ✓ {t("getInTouch.quickResponse")} • ✓ {t("getInTouch.professionalTeam")}
            </div>
          </div>
        </div>
      </div>

      {/* Register Form Modal */}
      {showRegisterForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-main-dark rounded-lg shadow-xl p-6 w-full max-w-md mx-4 relative">
            <RegisterForm onClose={toggleRegisterForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GetInTouch;
