import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab, adminStore } from "../../features/adminSlice";
import {
  BiHome,
  BiBuildings,
  BiUser,
  BiBookOpen,
  BiCog,
  BiLogOut,
  BiMenu,
  BiX,
} from "react-icons/bi";

const AdminSidebar = ({ onLogout }) => {
  const dispatch = useDispatch();
  const { activeTab } = useSelector(adminStore);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: "overview", name: "Overview", icon: BiHome },
    { id: "properties", name: "Properties", icon: BiBuildings },
    { id: "clients", name: "Clients", icon: BiUser },
    { id: "blogs", name: "Blogs", icon: BiBookOpen },
    { id: "settings", name: "Settings", icon: BiCog },
  ];

  const handleTabClick = (tabId) => {
    dispatch(setActiveTab(tabId));
    setIsMobileMenuOpen(false); // Close mobile menu after selection
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Mobile Menu Button (visible only on small screens)
  const MobileMenuButton = () => (
    <button
      onClick={toggleMobileMenu}
      className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white dark:bg-card-dark rounded-lg shadow-lg border border-light"
    >
      {isMobileMenuOpen ? (
        <BiX className="w-6 h-6 text-secondary dark:text-slate-300" />
      ) : (
        <BiMenu className="w-6 h-6 text-secondary dark:text-slate-300" />
      )}
    </button>
  );

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <aside className="hidden lg:block w-64 bg-white dark:bg-card-dark shadow-light min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-a flex items-center gap-3 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                    : "text-secondary dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-hover-color-dark"
                }`}
              >
                <tab.icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{tab.name}</span>
              </motion.button>
            </li>
          ))}
        </ul>

        <div className="mt-8 pt-4 border-t  ">
          <motion.button
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLogout}
            className="w-full text-left px-4 py-3 rounded-lg transition-a flex items-center gap-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <BiLogOut className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">Log Out</span>
          </motion.button>
        </div>
      </nav>
    </aside>
  );

  // Mobile Sidebar Overlay
  const MobileSidebar = () => (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed left-0 top-0 h-full w-80 bg-white dark:bg-card-dark shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6 border-b border-light">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-secondary dark:text-slate-300">
                  Dashboard
                </h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-hover-color-dark rounded-lg transition-a"
                >
                  <BiX className="w-5 h-5 text-secondary dark:text-slate-300" />
                </button>
              </div>
            </div>

            <nav className="p-4">
              <ul className="space-y-2">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <motion.button
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleTabClick(tab.id)}
                      className={`w-full text-left px-4 py-4 rounded-lg transition-a flex items-center gap-4 ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                          : "text-secondary dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-hover-color-dark"
                      }`}
                    >
                      <tab.icon className="w-6 h-6 flex-shrink-0" />
                      <span className="font-medium text-lg">{tab.name}</span>
                    </motion.button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-4 border-t border-light">
                <motion.button
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-4 rounded-lg transition-a flex items-center gap-4 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <BiLogOut className="w-6 h-6 flex-shrink-0" />
                  <span className="font-medium text-lg">
                    Log Outbbbbbbbbbbbbb
                  </span>
                </motion.button>
              </div>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <MobileMenuButton />
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default AdminSidebar;
