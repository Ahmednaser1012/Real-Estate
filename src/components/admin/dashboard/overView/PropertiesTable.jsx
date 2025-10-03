import React from 'react';
import { motion } from 'framer-motion';

const PropertiesTable = () => {
  const recentProperties = [
    {
      id: 1,
      title: "Luxury Villa in New Cairo",
      price: "2,500,000",
      status: "Available",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Apartment in Nasr City",
      price: "1,200,000",
      status: "Reserved",
      date: "2024-01-14",
    },
    {
      id: 3,
      title: "Commercial Shop Downtown",
      price: "800,000",
      status: "Available",
      date: "2024-01-13",
    },
    {
      id: 4,
      title: "Land for Sale North Coast",
      price: "3,000,000",
      status: "Under Review",
      date: "2024-01-12",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "Reserved":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Under Review":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="border-b border-light">
            <th className="text-left py-3 px-2 sm:px-4 font-semibold text-secondary dark:text-slate-300">
              Property
            </th>
            <th className="text-left py-3 px-2 sm:px-4 font-semibold text-secondary dark:text-slate-300">
              Price
            </th>
            <th className="text-left py-3 px-2 sm:px-4 font-semibold text-secondary dark:text-slate-300">
              Status
            </th>
            <th className="text-left py-3 px-2 sm:px-4 font-semibold text-secondary dark:text-slate-300">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {recentProperties.map((property) => (
            <motion.tr
              key={property.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-b border-light hover:bg-slate-50 dark:hover:bg-hover-color-dark transition-a"
            >
              <td className="py-3 px-2 sm:px-4 text-secondary dark:text-slate-300">
                <div className="truncate max-w-[200px] sm:max-w-none">
                  {property.title}
                </div>
              </td>
              <td className="py-3 px-2 sm:px-4 font-semibold text-green-600 dark:text-green-400">
                ${property.price}
              </td>
              <td className="py-3 px-2 sm:px-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    property.status
                  )}`}
                >
                  {property.status}
                </span>
              </td>
              <td className="py-3 px-2 sm:px-4 text-muted text-sm">
                {property.date}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertiesTable;