import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  setSearchFilters,
  clearSearchFilters,
  dataStore,
} from "../../../../features/dataSlice";
import {
  useGetAllCitiesQuery,
  useGetAreasByCityQuery,
} from "../../../../features/locationsApi";

const AdvancedSearch = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { searchFilters } = useSelector(dataStore);

  const [localFilters, setLocalFilters] = useState(searchFilters);
  const [isSearching, setIsSearching] = useState(false);
  const [showPropertyFilters, setShowPropertyFilters] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState(localFilters.city || "");

  // Fetch cities from backend
  const { data: citiesResponse, isLoading: citiesLoading } =
    useGetAllCitiesQuery();

  // Fetch areas only when a city is selected
  const { data: areasResponse, isLoading: areasLoading } =
    useGetAreasByCityQuery(
      { cityId: selectedCityId },
      { skip: !selectedCityId } // Skip query if no city selected
    );

  // Extract data from response - handle both array and object responses
  const cities = Array.isArray(citiesResponse)
    ? citiesResponse
    : citiesResponse?.data || [];

  // Filter areas by selected city ID (local filtering as backup)
  const allAreas = Array.isArray(areasResponse)
    ? areasResponse
    : areasResponse?.data || [];
  const areas = allAreas.filter(
    (area) => area.city_id === parseInt(selectedCityId)
  );

  // Update local filters when Redux filters change
  useEffect(() => {
    setLocalFilters(searchFilters);
    setIsSearching(false);
  }, [searchFilters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    // If city changes, reset area selection and update selectedCityId
    if (name === "city") {
      setSelectedCityId(value ? parseInt(value) : "");
      setLocalFilters((prev) => ({
        ...prev,
        [name]: value,
        area: "", // Reset area when city changes
      }));
    } else {
      setLocalFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSearch = () => {
    setIsSearching(true);
    dispatch(setSearchFilters(localFilters));
  };

  const handleClear = () => {
    setIsSearching(false);
    const clearedFilters = {
      city: "",
      area: "",
      projectType: "",
      propertyType: "",
      priceMin: "",
      priceMax: "",
      areaMin: "",
      areaMax: "",
      noOfRooms: "",
    };
    setLocalFilters(clearedFilters);
    dispatch(clearSearchFilters());
  };

  // Helper function to get the correct language name
  const getLocalizedName = (item) => {
    if (i18n.language === 'ar') {
      return item.name_ar || item.name || item.name_en;
    }
    return item.name_en || item.name || item.name_ar;
  };

  return (
    <div className="p-3 border dark:border-dark">
      <h1 className="font-semibold">{t('filters.advancedSearch')}</h1>

      {/* Project Type */}
      <div className="mt-3">
        <select
          name="projectType"
          value={localFilters.projectType}
          onChange={handleFilterChange}
          className="filter"
        >
          <option value="">{t('filters.projectType')}</option>
          <option value="residential">{t('enums.projectTypes.residential')}</option>
          <option value="commercial">{t('enums.projectTypes.commercial')}</option>
        </select>
      </div>

      {/* City */}
      <div className="mt-3">
        <select
          name="city"
          value={localFilters.city}
          onChange={handleFilterChange}
          className="filter"
          disabled={citiesLoading}
        >
          <option value="">
            {citiesLoading ? t('filters.loadingCities') : t('filters.selectCity')}
          </option>
          {cities &&
            cities.length > 0 &&
            cities.map((city) => (
              <option key={city.id} value={city.id}>
                {getLocalizedName(city)}
              </option>
            ))}
        </select>
      </div>

      {/* Area - Disabled until city is selected */}
      <div className="mt-3">
        <select
          name="area"
          value={localFilters.area}
          onChange={handleFilterChange}
          className="filter"
          disabled={!localFilters.city || areasLoading}
        >
          <option value="">
            {!localFilters.city
              ? t('filters.selectCityFirst')
              : areasLoading
              ? t('filters.loadingAreas')
              : t('filters.selectArea')}
          </option>
          {areas &&
            areas.length > 0 &&
            areas.map((area) => (
              <option key={area.id} value={area.id}>
                {getLocalizedName(area)}
              </option>
            ))}
        </select>
      </div>

      {/* Property Filters Toggle */}
      <button
        onClick={() => setShowPropertyFilters(!showPropertyFilters)}
        className="mt-4 w-full px-3 py-2 bg-slate-100 dark:bg-dark-light text-slate-700 dark:text-slate-300 rounded text-sm hover:bg-slate-200 dark:hover:bg-card-dark transition-a"
      >
        {showPropertyFilters
          ? t('filters.hidePropertyFilters')
          : t('filters.showPropertyFilters')}
      </button>

      {/* Property Filters */}
      {showPropertyFilters && (
        <div className="mt-4 p-3 bg-slate-50 dark:bg-dark-light rounded border border-slate-200 dark:border-card-dark">
          <h3 className="font-semibold text-sm mb-3">{t('filters.propertyDetails')}</h3>

          {/* Property Type */}
          <div className="mt-3">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              {t('filters.propertyType')}
            </label>
            <select
              name="propertyType"
              value={localFilters.propertyType}
              onChange={handleFilterChange}
              className="filter w-full"
            >
              <option value="">{t('filters.allTypes')}</option>
              <option value="apartments">{t('enums.propertyTypes.apartments')}</option>
              <option value="duplexes">{t('enums.propertyTypes.duplexes')}</option>
              <option value="studios">{t('enums.propertyTypes.studios')}</option>
              <option value="offices">{t('enums.propertyTypes.offices')}</option>
              <option value="clinics">{t('enums.propertyTypes.clinics')}</option>
              <option value="retails">{t('enums.propertyTypes.retails')}</option>
            </select>
          </div>

          {/* Area Range */}
          <div className="mt-3">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              {t('filters.area')} ({t('filters.areaUnit')})
            </label>
            <div className="flex gap-2 mt-1">
              <input
                type="number"
                name="areaMin"
                value={localFilters.areaMin || ""}
                onChange={handleFilterChange}
                placeholder={t('filters.min')}
                className="filter flex-1"
              />
              <input
                type="number"
                name="areaMax"
                value={localFilters.areaMax || ""}
                onChange={handleFilterChange}
                placeholder={t('filters.max')}
                className="filter flex-1"
              />
            </div>
          </div>

          {/* Price Range */}
          <div className="mt-3">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              {t('filters.price')} ({t('filters.priceUnit')})
            </label>
            <div className="flex gap-2 mt-1">
              <input
                type="number"
                name="priceMin"
                value={localFilters.priceMin || ""}
                onChange={handleFilterChange}
                placeholder={t('filters.min')}
                className="filter flex-1"
              />
              <input
                type="number"
                name="priceMax"
                value={localFilters.priceMax || ""}
                onChange={handleFilterChange}
                placeholder={t('filters.max')}
                className="filter flex-1"
              />
            </div>
          </div>

          {/* Bedrooms */}
          <div className="mt-3">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              {t('filters.bedrooms')}
            </label>
            <input
              type="number"
              name="noOfRooms"
              value={localFilters.noOfRooms || ""}
              onChange={handleFilterChange}
              placeholder={t('filters.numberOfBedrooms')}
              className="filter w-full"
            />
          </div>
        </div>
      )}

      {/* Search and Clear Buttons */}
      <div className="gap-2 mt-4 flex flex-col sm:flex-row w-full">
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="btn bg-secondary flex-1 text-slate-200 !rounded-none hover:bg-primary transition-a disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSearching ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-200 border-t-transparent"></div>
              {t('filters.searching')}
            </>
          ) : (
            t('filters.search')
          )}
        </button>
        <button
          onClick={handleClear}
          className="btn bg-gray-400 dark:bg-gray-600 flex-1 text-slate-200 !rounded-none hover:bg-gray-500 transition-a flex items-center justify-center"
        >
          {t('filters.clear')}
        </button>
      </div>
    </div>
  );
};

export default AdvancedSearch;
