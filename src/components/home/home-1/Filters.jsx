import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BiBuildings, BiMap, BiMoney } from "react-icons/bi";
import { setSearchFilters } from "../../../features/dataSlice";
import {
  useGetAllCitiesQuery,
  useGetAreasByCityQuery,
} from "../../../features/locationsApi";

const Filters = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    title: "",
    projectType: "",
    city: "",
    area: "",
    priceMin: "",
    priceMax: "",
  });

  const [selectedCityId, setSelectedCityId] = useState("");

  // Fetch cities from backend
  const { data: citiesResponse, isLoading: citiesLoading } =
    useGetAllCitiesQuery();

  // Fetch areas by city
  const { data: areasResponse, isLoading: areasLoading } =
    useGetAreasByCityQuery(
      { cityId: selectedCityId },
      { skip: !selectedCityId }
    );

  // Extract data from response
  const cities = Array.isArray(citiesResponse)
    ? citiesResponse
    : citiesResponse?.data || [];

  const allAreas = Array.isArray(areasResponse)
    ? areasResponse
    : areasResponse?.data || [];
  const areas = allAreas.filter(
    (area) => area.city_id === parseInt(selectedCityId)
  );

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    if (name === "city") {
      setSelectedCityId(value ? parseInt(value) : "");
      setFilters((prev) => ({
        ...prev,
        [name]: value,
        area: "", // Reset area when city changes
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSearch = () => {
    // Dispatch filters to Redux
    dispatch(setSearchFilters(filters));
    // Navigate to projects page
    navigate("/projects");
  };

  return (
    <div className="md:max-max-w-7xl px-4 w-full mx-auto relative -mt-8 sm:-mt-20">
      {/* <div className=" rounded-lg shadow-lg dark:shadow-none p-4 md:p-6"> */}
        <div className="flex-col bg-white gap-x-4  gap-y-4 md:gap-y-0 md:flex-row card card-shadow dark:shadow-none">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
          {/* Project Type */}
          <div className="flex flex-col">
            <label className="font-bold text-sm mb-2 text-gray-700 dark:text-gray-300">
              Project Type
            </label>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-100 dark:bg-hover-color-dark h-10">
              <BiBuildings className="text-gray-600 dark:text-gray-400 flex-shrink-0" />
              <select
                name="projectType"
                value={filters.projectType}
                onChange={handleFilterChange}
                className="w-full bg-transparent border-0 outline-none dark:bg-hover-color-dark opacity-70"
              >
                <option className="text-black" value="">
                  All Types
                </option>
                <option className="text-black" value="residential">
                  Residential
                </option>
                <option className="text-black" value="commercial">
                  Commercial
                </option>
              </select>
            </div>
          </div>

          {/* City */}
          <div className="flex flex-col">
            <label className="font-bold text-sm mb-2 text-gray-700 dark:text-gray-300">
              City
            </label>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-100 dark:bg-hover-color-dark h-10">
              <BiMap className="text-gray-600 dark:text-gray-400 flex-shrink-0" />
              <select
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                disabled={citiesLoading}
                className="w-full bg-transparent border-0 outline-none dark:bg-hover-color-dark opacity-70"
              >
                <option className="text-black " value="">
                  {citiesLoading ? "Loading..." : "Select City"}
                </option>
                {cities &&
                  cities.length > 0 &&
                  cities.map((city) => (
                    <option
                      className="text-black"
                      key={city.id}
                      value={city.id}
                    >
                      {city.name || city.name_en || city.name_ar}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Area */}
          <div className="flex flex-col">
            <label className="font-bold text-sm mb-2 text-gray-700 dark:text-gray-300">
              Area
            </label>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-100 dark:bg-hover-color-dark h-10">
              <BiMap className="text-gray-600 dark:text-gray-400 flex-shrink-0" />
              <select
                name="area"
                value={filters.area}
                onChange={handleFilterChange}
                disabled={!filters.city || areasLoading}
                className="w-full bg-transparent border-0 outline-none dark:bg-hover-color-dark opacity-70"
              >
                <option className="text-black" value="">
                  {!filters.city
                    ? "Select City First"
                    : areasLoading
                    ? "Loading..."
                    : "Select Area"}
                </option>
                {areas &&
                  areas.length > 0 &&
                  areas.map((area) => (
                    <option
                      className="text-black"
                      key={area.id}
                      value={area.id}
                    >
                      {area.name || area.name_en || area.name_ar}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div className="flex flex-col">
            <label className="font-bold text-sm mb-2 text-gray-700 dark:text-gray-300">
              Price (EGP)
            </label>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-100 dark:bg-hover-color-dark h-10">
              <BiMoney className="text-gray-600 dark:text-gray-400 flex-shrink-0" />
              <div className="flex gap-1 w-full">
                <input
                  type="number"
                  name="priceMin"
                  value={filters.priceMin}
                  onChange={handleFilterChange}
                  placeholder="Min"
                  className="w-12 bg-transparent border-0 outline-none text-sm"
                />
                <span className="text-gray-400 text-sm">-</span>
                <input
                  type="number"
                  name="priceMax"
                  value={filters.priceMax}
                  onChange={handleFilterChange}
                  placeholder="Max"
                  className="w-12 bg-transparent border-0 outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex">
            <button
              onClick={handleSearch}
              className="w-full btn btn-primary px-6 py-3 font-semibold rounded-lg h-10 flex items-center justify-center"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
