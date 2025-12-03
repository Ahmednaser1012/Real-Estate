import { useState, useEffect } from "react";
import { FiDelete } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  AdvancedSearch,
  CTA,
  HeadeFilters,
  Pagination,
  PropertyFullWidth,
  SocialIcons,
} from "../components/common/page-componets";
import { PropertyList } from "../components/property";
import { closeFilterMenu, uiStore } from "../features/uiSlice";
import { useGetAllProjectsQuery } from "../features/projectsApi";
import { setIsLoading, setTotalCount, dataStore } from "../features/dataSlice";

const PropertyFive = () => {
  const { t } = useTranslation();
  const { isFilterMenuOpen } = useSelector(uiStore);
  const { totalCount, currentPage, searchFilters } = useSelector(dataStore);
  const dispatch = useDispatch();
  const handleCloseFiltermenu = (e) => {
    if (e.target.classList.contains("filter-modal"))
      dispatch(closeFilterMenu());
  };

  const [layout, setLayout] = useState("grid");
  const itemsPerPage = 8;

  // Build query parameters with filters
  const queryParams = {
    limit: 100,
    offset: 0,
    ...(searchFilters.city && { city: searchFilters.city }),
    ...(searchFilters.area && { area: searchFilters.area }),
    ...(searchFilters.projectType && {
      projectType: searchFilters.projectType,
    }),
    ...(searchFilters.propertyType && {
      propertyType: searchFilters.propertyType,
    }),
    ...(searchFilters.priceMin && { priceMin: searchFilters.priceMin }),
    ...(searchFilters.priceMax && { priceMax: searchFilters.priceMax }),
    ...(searchFilters.areaMin && { areaMin: searchFilters.areaMin }),
    ...(searchFilters.areaMax && { areaMax: searchFilters.areaMax }),
    ...(searchFilters.noOfRooms && { noOfRooms: searchFilters.noOfRooms }),
  };

  // Fetch projects from API with search filters
  // RTK Query will automatically refetch when queryParams changes
  const {
    data: response = {},
    isLoading,
    error,
  } = useGetAllProjectsQuery(queryParams);

  // Update Redux store with total count
  useEffect(() => {
    dispatch(setIsLoading(isLoading));
    if (response?.data && response.data.length > 0) {
      dispatch(setTotalCount(response.count || 0));
    } else if (response?.data && response.data.length === 0) {
      dispatch(setTotalCount(0));
    }
  }, [response?.count, response?.data, isLoading, dispatch]);

  return (
    <div className="pt-36 max-w-7xl mx-auto px-4">
      <HeadeFilters
        layout={layout}
        setLayout={setLayout}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalCount}
      />

      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}

      {error && (
        <div className="text-center py-20">
          <p className="text-red-500">
            {t('filters.errorLoading')}
          </p>
        </div>
      )}

      {!isLoading && !error && (
        <div className="grid md:grid-cols-4 gap-x-14 mt-5">
          <div className="md:col-span-3 mt-5 md:mt-0 h-fit md:sticky top-0 ">
            {layout === "grid" ? <PropertyList /> : <PropertyFullWidth />}
            <Pagination
              itemsPerPage={itemsPerPage}
              pageData={response?.data || []}
            />
          </div>
          <div className=" md:col-span-1 row-start-3 md:row-start-auto h-fit md:sticky top-0">
            <div
              className={`filter-modal ${isFilterMenuOpen && "open"}`}
              onClick={handleCloseFiltermenu}
            >
              <div className={`filter-dialog ${isFilterMenuOpen && "open"}`}>
                <div className="flex-center-between border-b dark:border-dark md:hidden">
                  <div
                    className="icon-box md:hidden"
                    onClick={() => dispatch(closeFilterMenu())}
                  >
                    <FiDelete />
                  </div>
                  <p className="uppercase">{t('filters.label')}</p>
                </div>
                <AdvancedSearch />
                {/* <PriceRange />ا*/}
                <SocialIcons />
                <CTA />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFive;
