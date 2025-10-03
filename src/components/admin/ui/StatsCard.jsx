import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon: Icon, color, trend, trendValue, loading = false }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-yellow-600',
    purple: 'from-purple-500 to-purple-600',
    red: 'from-red-500 to-red-600',
    primary: 'from-primary to-secondary',
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded w-24"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-500 rounded w-16"></div>
          </div>
          <div className="w-12 h-12 bg-gray-300 dark:bg-gray-500 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-gradient-to-r ${colorClasses[color] || colorClasses.primary} rounded-xl p-4 sm:p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-white/80 text-xs sm:text-sm font-medium truncate">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold mt-1">{value}</p>
          {trend && (
            <div className="flex items-center mt-2 text-xs sm:text-sm">
              <span className={`flex items-center ${trend === 'up' ? 'text-green-200' : 'text-red-200'}`}>
                {trend === 'up' ? '↗' : '↘'} {trendValue}
              </span>
              <span className="text-white/60 ml-1 hidden sm:inline">from last month</span>
            </div>
          )}
        </div>
        <div className="text-3xl sm:text-4xl opacity-80 flex-shrink-0 ml-2">
          {typeof Icon === 'string' ? Icon : Icon && <Icon className="w-8 h-8 sm:w-10 sm:h-10" />}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;