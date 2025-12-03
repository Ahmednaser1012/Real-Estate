import React from "react";
import { FaList } from "react-icons/fa";
import { FiFilter, FiGrid } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { openFilterMenu } from "../../../../features/uiSlice";

const HeadeFilters = ({ layout, setLayout, currentPage = 1, itemsPerPage = 8, totalItems = 0 }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  
  // Calculate the range of items being shown
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  
  return (
    <div className="flex-col gap-4 flex-center-between md:flex-row">
      <div className="w-full flex-center-between">
        <div className="gap-2 flex-align-center">
          <div
            className={`w-10 h-10 rounded-xl grid place-items-center bg-slate-100 hover:bg-slate-200 sm:cursor-pointer transition-a dark:bg-card-dark  ${
              layout === "grid" && "!bg-primary text-white"
            }`}
            onClick={() => setLayout("grid")}
          >
            <FiGrid />
          </div>
          <div
            className={`w-10 h-10 rounded-xl grid place-items-center bg-slate-100 sm:cursor-pointer hover:bg-slate-200 transition-a dark:bg-card-dark ${
              layout === "list" && "!bg-primary text-white"
            }`}
            onClick={() => setLayout("list")}
          >
            <FaList />
          </div>
          <div
            className="grid w-10 h-10 md:hidden rounded-xl place-items-center bg-slate-100 sm:cursor-pointer hover:bg-slate-200 transition-a dark:bg-card-dark"
            onClick={() => dispatch(openFilterMenu())}
          >
            <FiFilter />
          </div>
        </div>
        <p>{t('filters.showing')} {String(startItem).padStart(2, '0')} - {String(endItem).padStart(2, '0')} {t('filters.of')} {totalItems} {t('filters.results')}</p>
      </div>
      <div className="w-full gap-4 flex-center-between">
        {/* <select
          name=""
          id=""
          className="w-[290px] px-3 py-2 bg-white border outline-none dark:border-dark dark:bg-main-dark"
        >
          <option value="">Sorty by</option>
          <option value="latest">Latest</option>
          <option value="cheapest">Cheapest</option>
          <option value="expensive">Expensive</option>
        </select> */}
        {/* <input
          type="text"
          className="border outline-none bg-transparent dark:border-dark px-3 py-[0.35rem] w-full"
          placeholder="Enter Keywords.."
        /> */}
      </div>
    </div>
  );
};

export default HeadeFilters;
