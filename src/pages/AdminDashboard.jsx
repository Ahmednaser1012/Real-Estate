import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { logout, adminStore } from "../features/adminSlice";
import { uiStore } from "../features/uiSlice";
import AdminHeader from "../components/admin/ui/AdminHeader";
import AdminSidebar from "../components/admin/ui/AdminSidebar";
import {
  PropertiesTab,
  ProjectsTab,
  ClientsTab,
  BlogsTab,
  CareersTab,
  EventsTab,
  SettingsTab,
} from "../components/admin/dashboard";
import { ServicesTab } from "../components/admin/dashboard/servicestab";
import { LocationsTab } from "../components/admin/dashboard/locationstab";

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
      case "properties":
        return <PropertiesTab />;
      case "projects":
        return <ProjectsTab />;
      case "facilities":
        return <ServicesTab />;
      case "locations":
        return <LocationsTab />;
      case "clients":
        return <ClientsTab />;
      case "blogs":
        return <BlogsTab />;
      case "careers":
        return <CareersTab />;
      case "events":
        return <EventsTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return <PropertiesTab />;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  const { isMobileMenuOpen, toggleMobileMenu, DesktopSidebar, MobileSidebar } = AdminSidebar({ onLogout: handleLogout });

  return (
    <div className="min-h-screen bg-main-bg dark:bg-main-dark transition-a overflow-x-hidden">
      <AdminHeader onLogout={handleLogout} isMobileMenuOpen={isMobileMenuOpen} onToggleMobileMenu={toggleMobileMenu} />

      <div className="flex w-full">
        <DesktopSidebar />

        <main className="flex-1 w-full min-h-screen overflow-x-hidden">
          <div className="p-4 sm:p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </main>

        <MobileSidebar />
      </div>
    </div>
  );
};

export default AdminDashboard;
