import { motion } from "framer-motion";
import { FaBuilding, FaBriefcase, FaStore, FaHome, FaHospital, FaCouch } from "react-icons/fa";

const PropertyFilter = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: "all", label: "All", icon: FaBuilding },
    { id: "apartments", label: "Apartments", icon: FaBuilding },
    { id: "duplexes", label: "Duplexes", icon: FaHome },
    { id: "studios", label: "Studios", icon: FaCouch },
    { id: "offices", label: "Offices", icon: FaBriefcase },
    { id: "clinics", label: "Clinics", icon: FaHospital },
    { id: "retails", label: "Retails", icon: FaStore },
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = activeFilter === filter.id;

        return (
          <motion.button
            key={filter.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFilterChange(filter.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
              ${
                isActive
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }
            `}
          >
            <Icon className="w-4 h-4" />
            <span>{filter.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default PropertyFilter;
