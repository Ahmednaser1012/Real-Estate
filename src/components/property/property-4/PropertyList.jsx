import { useSelector } from "react-redux";
import { dataStore } from "../../../features/dataSlice";
import SingleProductCard from "../../common/page-componets/SingleProductCard";

const PropertyList = ({ basis }) => {
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
    <div className="flex flex-wrap gap-4">
      {currentDataItems?.map((property) => (
        <SingleProductCard key={property.id} {...property} basis={basis} />
      ))}
    </div>
  );
};

export default PropertyList;
