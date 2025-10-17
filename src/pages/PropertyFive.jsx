import { useState, useEffect } from "react";
import { FiDelete } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  AdvancedSearch,
  CTA,
  HeadeFilters,
  Pagination,
  PriceRange,
  PropertyFullWidth,
  SocialIcons,
} from "../components/common/page-componets";
import { PropertyList } from "../components/property";
import { closeFilterMenu, uiStore } from "../features/uiSlice";
import { useGetAllProjectsQuery } from "../features/projectsApi";
import { getCurrentItems, setIsLoading } from "../features/dataSlice";

const PropertyFive = () => {
  const { isFilterMenuOpen } = useSelector(uiStore);
  const dispatch = useDispatch();
  const handleCloseFiltermenu = (e) => {
    if (e.target.classList.contains("filter-modal"))
      dispatch(closeFilterMenu());
  };

  const [layout, setLayout] = useState("grid");
  
  // Fetch projects from API
  const { data: projects = [], isLoading, error } = useGetAllProjectsQuery();

  // Update Redux store with projects data
  useEffect(() => {
    dispatch(setIsLoading(isLoading));
    if (projects && projects.length > 0) {
      dispatch(getCurrentItems(projects));
    }
  }, [projects, isLoading, dispatch]);

  return (
    <div className="pt-20 max-w-7xl mx-auto px-4">
      <HeadeFilters layout={layout} setLayout={setLayout} />
      
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}

      {error && (
        <div className="text-center py-20">
          <p className="text-red-500">Error loading projects. Please try again later.</p>
        </div>
      )}

      {!isLoading && !error && (
        <div className="grid md:grid-cols-4 gap-x-14 mt-5">
          <div className="md:col-span-3 mt-5 md:mt-0 h-fit md:sticky top-0 ">
            {layout === "grid" ? <PropertyList /> : <PropertyFullWidth />}
            <Pagination itemsPerPage={8} pageData={projects} />
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
                  <p className="uppercase">Filters</p>
                </div>
                <AdvancedSearch />
                <PriceRange />
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
