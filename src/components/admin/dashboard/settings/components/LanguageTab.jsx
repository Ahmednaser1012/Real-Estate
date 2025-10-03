import React, { useState, useEffect } from "react";
import { BiGlobe, BiCheck } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import AdminButton from "../../../ui/AdminButton";

const LanguageTab = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "en");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  const handleSaveLanguage = () => {
    setIsSaving(true);
    // Change language using i18n
    i18n.changeLanguage(language).then(() => {
      // Update document direction
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = language;
      
      setTimeout(() => {
        setIsSaving(false);
        alert(`Language changed to ${language === "en" ? "English" : "العربية"}`);
      }, 500);
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <BiGlobe className="text-primary text-2xl" />
          Select Your Preferred Language
        </h3>
        <p className="text-gray-600">
          Choose the language for your dashboard interface
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
        {/* English Option */}
        <button
          onClick={() => setLanguage("en")}
          className={`relative p-6 border-2 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
            language === "en"
              ? "border-primary bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg"
              : "border-gray-300 bg-white hover:border-primary hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50"
          }`}
        >
          {language === "en" && (
            <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-1">
              <BiCheck className="w-5 h-5" />
            </div>
          )}
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full">
              <BiGlobe className="text-3xl text-white" />
            </div>
            <div className="text-left">
              <h4 className="text-lg font-bold text-gray-800 mb-1">English</h4>
              <p className="text-sm text-gray-600">
                Set interface to English
              </p>
            </div>
          </div>
        </button>

        {/* Arabic Option */}
        <button
          onClick={() => setLanguage("ar")}
          className={`relative p-6 border-2 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
            language === "ar"
              ? "border-primary bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg"
              : "border-gray-300 bg-white hover:border-primary hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50"
          }`}
        >
          {language === "ar" && (
            <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-1">
              <BiCheck className="w-5 h-5" />
            </div>
          )}
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full">
              <BiGlobe className="text-3xl text-white" />
            </div>
            <div className="text-left">
              <h4 className="text-lg font-bold text-gray-800 mb-1">العربية</h4>
              <p className="text-sm text-gray-600">تعيين الواجهة إلى العربية</p>
            </div>
          </div>
        </button>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <AdminButton
          variant="primary"
          size="lg"
          loading={isSaving}
          onClick={handleSaveLanguage}
          className="shadow-lg hover:shadow-xl"
        >
          Save Language Settings
        </AdminButton>
        <p className="text-sm text-gray-500">
          Current: <span className="font-semibold text-primary">
            {language === "en" ? "English" : "العربية"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LanguageTab;
