import { useTranslation } from "react-i18next";
import { BiX } from "react-icons/bi";
import AdminButton from "../../ui/AdminButton";

const AddClientModal = ({
  isOpen,
  formData,
  formError,
  formSuccess,
  isSubmitting,
  projectsLoading,
  citiesLoading,
  areasLoading,
  projects,
  cities,
  areas,
  onFormChange,
  onFormSubmit,
  onClose,
}) => {
  const { t, i18n } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary to-secondary px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{t("admin.addNewClient")}</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-800 p-1 rounded transition"
          >
            <BiX className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={onFormSubmit} className="p-6 space-y-4">
          {formError && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {formError}
            </div>
          )}

          {formSuccess && (
            <div className="p-3 bg-green-100 text-green-700 rounded-md text-sm">
              {t("registerForm.registrationReceived")}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1 text-black ">
              {t("registerForm.fullName")}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={onFormChange}
              className="w-full px-3 py-2 border rounded-md outline-none bg-transparent text-black dark:border-gray-700"
              placeholder={t("registerForm.yourFullName")}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-black ">
              {t("registerForm.emailAddress")}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={onFormChange}
              className="w-full px-3 py-2 border rounded-md outline-none bg-transparent text-black dark:border-gray-700"
              placeholder={t("registerForm.yourEmailAddress")}
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1 text-black ">
              {t("registerForm.phoneNumber")}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={onFormChange}
              className="w-full px-3 py-2 border rounded-md outline-none bg-transparent text-black dark:border-gray-700"
              placeholder={t("registerForm.yourPhoneNumber")}
              required
            />
          </div>

          <div>
            <label htmlFor="project_id" className="block text-sm font-medium mb-1 text-black ">
              {t("registerForm.project")}
            </label>
            <select
              id="project_id"
              name="project_id"
              value={formData.project_id}
              onChange={onFormChange}
              disabled={projectsLoading}
              className="w-full px-3 py-2 border rounded-md outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">
                {projectsLoading ? t("common.loading") : t("registerForm.selectProject")}
              </option>
              {projects &&
                projects.length > 0 &&
                projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {i18n.language === "ar" ? (project.title_ar || project.title_en) : (project.title_en || project.title_ar)}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label htmlFor="city_id" className="block text-sm font-medium mb-1 text-black">
              {t("registerForm.city")}
            </label>
            <select
              id="city_id"
              name="city_id"
              value={formData.city_id}
              onChange={onFormChange}
              disabled={citiesLoading}
              className="w-full px-3 py-2 border rounded-md outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">
                {citiesLoading ? t("common.loading") : t("registerForm.selectCity")}
              </option>
              {cities &&
                cities.length > 0 &&
                cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {i18n.language === "ar" ? (city.name_ar || city.name_en || city.name) : (city.name_en || city.name || city.name_ar)}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label htmlFor="area_id" className="block text-sm font-medium mb-1 text-black">
              {t("registerForm.area")}
            </label>
            <select
              id="area_id"
              name="area_id"
              value={formData.area_id}
              onChange={onFormChange}
              disabled={!formData.city_id || areasLoading}
              className="w-full px-3 py-2 border rounded-md outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">
                {!formData.city_id
                  ? t("registerForm.selectCityFirst")
                  : areasLoading
                  ? t("common.loading")
                  : t("registerForm.selectArea")}
              </option>
              {areas &&
                areas.length > 0 &&
                areas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {i18n.language === "ar" ? (area.name_ar || area.name_en || area.name) : (area.name_en || area.name || area.name_ar)}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label htmlFor="unit_type" className="block text-sm font-medium mb-1 text-black">
              {t("registerForm.unitType")}
            </label>
            <select
              id="unit_type"
              name="unit_type"
              value={formData.unit_type}
              onChange={onFormChange}
              className="w-full px-3 py-2 border rounded-md outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">{t("registerForm.selectUnitType")}</option>
              <option value="apartments">{t("enums.unitTypes.apartments")}</option>
              <option value="studios">{t("enums.unitTypes.studios")}</option>
              <option value="duplexes">{t("enums.unitTypes.duplexes")}</option>
              <option value="offices">{t("enums.unitTypes.offices")}</option>
              <option value="clinics">{t("enums.unitTypes.clinics")}</option>
              <option value="retails">{t("enums.unitTypes.retails")}</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1 text-black">
              {t("registerForm.message")}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={onFormChange}
              rows="3"
              className="w-full px-3 py-2 border rounded-md outline-none  text-black dark:border-gray-700"
              placeholder={t("registerForm.tellUsAboutInterest")}
            ></textarea>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t flex justify-end gap-3">
          <AdminButton
            type="button"
            variant="outline"
            onClick={onClose}
          >
            {t("common.cancel")}
          </AdminButton>
          <AdminButton
            type="button"
            variant="primary"
            onClick={onFormSubmit}
            loading={isSubmitting}
          >
            {isSubmitting ? t("registerForm.submitting") : t("admin.addNewClient")}
          </AdminButton>
        </div>
      </div>
    </div>
  );
};

export default AddClientModal;
