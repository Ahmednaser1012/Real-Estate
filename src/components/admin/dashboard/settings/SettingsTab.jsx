import React, { useState, useEffect } from "react";
import { BiCog, BiUser, BiGlobe } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import AdminCard from "../../ui/AdminCard";
import { LanguageTab } from "./components";

const SettingsTab = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("language");

  useEffect(() => {
    setActiveTab("language");
  }, []);

  return (
    <AdminCard
      title={t("admin.settings")}
      subtitle={t("settings.manageSystemSettings")}
      icon={BiCog}
    >
      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200">
          {/* <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "users"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <BiUser className="inline mr-2" />
            User Management
          </button> */}
          <button
            onClick={() => setActiveTab("language")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "language"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <BiGlobe className="inline mr-2" />
            {t("settings.language")}
          </button>
        </div>

        {/* Tab Content */}
        {/* {activeTab === "users" && <UserManagementTab />} */}
        {activeTab === "language" && <LanguageTab />}
      </div>
    </AdminCard>
  );
};

export default SettingsTab;
