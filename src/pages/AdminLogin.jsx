import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiMail, FiEye, FiEyeOff, FiSun, FiMoon } from "react-icons/fi";
import { BiShield } from "react-icons/bi";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  adminStore,
} from "../features/adminSlice";
import { toggleDarkMode, uiStore } from "../features/uiSlice";
import AdminInput from "../components/admin/ui/AdminInput";
import AdminButton from "../components/admin/ui/AdminButton";

const AdminLogin = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, isAuthenticated } = useSelector(adminStore);
  const { darkMode } = useSelector(uiStore);

  // Admin credentials (in real app should be in database)
  const ADMIN_EMAIL = "admin@admin.com";
  const ADMIN_PASSWORD = "admin";

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

     setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        dispatch(loginSuccess({ email }));
        navigate("/admin/dashboard");
      } else {
        dispatch(loginFailure(t('adminLogin.invalidCredentials')));
      }
    }, 1000);
  };

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <div className="min-h-screen bg-main-bg dark:bg-main-dark flex-center-center px-4 transition-a">
      {/* Dark Mode Toggle */}
      {/* <button
        onClick={handleToggleDarkMode}
        className="fixed top-4 left-4 icon-box z-10"
        title={darkMode ? "Light Mode" : "Dark Mode"}
      >
        {darkMode ? (
          <FiSun className="w-5 h-5" />
        ) : (
          <FiMoon className="w-5 h-5" />
        )}
      </button> */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card w-full max-w-md shadow-lg"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex-center-center mx-auto mb-4"
          >
            <BiShield className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="heading text-2xl mb-2">{t('adminLogin.title')}</h2>
          <p className="text-muted">
            {t('adminLogin.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AdminInput
            label={t('adminLogin.emailLabel')}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('adminLogin.emailPlaceholder')}
            icon={FiMail}
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary dark:text-slate-300">
              {t('adminLogin.passwordLabel')}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`input w-full ${i18n.language === 'ar' ? 'pl-10 pr-3' : 'pl-3 pr-10'}`}
                placeholder={t('adminLogin.passwordPlaceholder')}
                required
              />
              <div className={`absolute inset-y-0 ${i18n.language === 'ar' ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center`}>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-muted hover:text-primary transition-a" />
                  ) : (
                    <FiEye className="h-5 w-5 text-muted hover:text-primary transition-a" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <AdminButton
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full"
          >
            {t('adminLogin.signIn')}
          </AdminButton>
        </form>

        <div className="mt-6 text-center">
          <div className="bg-slate-50 dark:bg-dark-light rounded-lg p-4">
            <p className="text-sm text-muted mb-2">{t('adminLogin.demoCredentials')}</p>
            <p className="text-sm font-mono text-secondary dark:text-slate-300">
              admin@admin.com / admin
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
