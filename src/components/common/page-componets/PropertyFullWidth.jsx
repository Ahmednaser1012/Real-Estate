import { useSelector } from "react-redux";
import { dataStore } from "../../../features/dataSlice";
import SingleProductCardFullWidth from "./SingleProductCardFullWidth";

const PropertyFullWidth = () => {
  const { currentDataItems, totalCount, loading } = useSelector(dataStore);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!loading && totalCount === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">
          No results match your search criteria
        </p>
        <p className="text-gray-400 text-sm mt-2">
          try changing the search criteria and try again
        </p>
      </div>
    );
  }

  return (
    <div>
      {currentDataItems?.map((property) => (
        <SingleProductCardFullWidth key={property.id} {...property} />
      ))}
    </div>
  );
};

export default PropertyFullWidth;
