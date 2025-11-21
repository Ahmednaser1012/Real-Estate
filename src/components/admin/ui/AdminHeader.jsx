import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode, uiStore } from "../../../features/uiSlice";
import { adminStore } from "../../../features/adminSlice";
import { FiSun, FiMoon, FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import { BiUser, BiChevronDown, BiMenu, BiX } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";

const AdminHeader = ({ onLogout, isMobileMenuOpen, onToggleMobileMenu }) => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector(uiStore);
  const { adminEmail } = useSelector(adminStore);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsProfileDropdownOpen(false);
    onLogout();
  };

  return (
    <header className="bg-white dark:bg-card-dark shadow-light border-b border-light w-full">
      <div className="px-4 sm:px-6 py-4 w-full">
        <div className="flex items-center justify-between w-full">
          {/* Left side - Title with space for mobile menu button */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-2xl font-bold text-secondary dark:text-slate-300 truncate">
              Admin Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-muted truncate">
              Welcome back, {adminEmail}
            </p>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-2 sm:gap-4 ml-4">
            {/* Mobile Menu Button */}
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden icon-box"
              title="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <BiX className="w-5 h-5" />
              ) : (
                <BiMenu className="w-5 h-5" />
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={handleToggleDarkMode}
              className="icon-box"
              title={darkMode ? "Light Mode" : "Dark Mode"}
            >
              {darkMode ? (
                <FiSun className="w-5 h-5" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-hover-color-dark transition-a"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex-center-center text-white">
                  <BiUser className="w-4 h-4" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-secondary dark:text-slate-300 truncate max-w-[120px]">
                    Admin
                  </p>
                  <p className="text-xs text-muted truncate max-w-[120px]">
                    {adminEmail}
                  </p>
                </div>
                <BiChevronDown
                  className={`w-4 h-4 text-muted transition-transform duration-200 ${
                    isProfileDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-card-white   rounded-lg shadow-xl border border-light z-50"
                  >
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-light">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex-center-center text-white">
                          <BiUser className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-secondary dark:text-slate-800 truncate">
                            Administrator
                          </p>
                          <p className="text-sm text-muted truncate">
                            {adminEmail}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          // Add profile settings logic here
                        }}
                        className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-hover-color-dark transition-a text-secondary dark:text-slate-800"
                      >
                        <FiUser className="w-4 h-4" />
                        <span>Profile Settings</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          // Add account settings logic here
                        }}
                        className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-hover-color-dark transition-a text-secondary dark:text-slate-800"
                      >
                        <FiSettings className="w-4 h-4" />
                        <span>Account Settings</span>
                      </button>

                      <div className="border-t border-light my-2"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-a text-red-600"
                      >
                        <FiLogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
