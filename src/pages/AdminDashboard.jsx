import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { logout, adminStore } from "../features/adminSlice";
import { uiStore } from "../features/uiSlice";
import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";
import {
  OverviewTab,
  PropertiesTab,
  ClientsTab,
  BlogsTab,
  SettingsTab,
} from "../components/admin/dashboard";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, activeTab } = useSelector(adminStore);
  const { darkMode } = useSelector(uiStore);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }
  }, [isAuthenticated, navigate]);

  // Apply dark mode to document
  useEffect(() => {
    const rootDoc = document.documentElement;
    if (darkMode) {
      rootDoc.classList.add("dark");
    } else {
      rootDoc.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "properties":
        return <PropertiesTab />;
      case "clients":
        return <ClientsTab />;
      case "blogs":
        return <BlogsTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return <OverviewTab />;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-main-bg dark:bg-main-dark transition-a">
      <AdminHeader onLogout={handleLogout} />

      <div className="flex">
        <AdminSidebar onLogout={handleLogout} />

        <main className="flex-1 p-4 sm:p-6 lg:ml-0">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
