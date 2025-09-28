import React from "react";
import { motion } from "framer-motion";

const AdminCard = ({
  children,
  title,
  subtitle,
  icon: Icon,
  className = "",
  headerActions,
  loading = false,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`card shadow-light ${className}`}
      {...props}
    >
      {(title || Icon || headerActions) && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 pb-4 border-b  gap-4">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex-center-center text-white flex-shrink-0">
                <Icon className="w-5 h-5" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              {title && <h3 className="heading text-lg truncate">{title}</h3>}
              {subtitle && (
                <p className="text-muted text-sm truncate">{subtitle}</p>
              )}
            </div>
          </div>
          {headerActions && (
            <div className="flex items-center gap-2 flex-shrink-0">
              {headerActions}
            </div>
          )}
        </div>
      )}

      {loading ? (
        <div className="flex-center-center py-8">
          <div className="loader"></div>
        </div>
      ) : (
        children
      )}
    </motion.div>
  );
};

export default AdminCard;
