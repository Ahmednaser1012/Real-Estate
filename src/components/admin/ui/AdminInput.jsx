import React from 'react';
import { useTranslation } from 'react-i18next';

const AdminInput = ({ 
  label, 
  error, 
  icon: Icon,
  className = '',
  containerClassName = '',
  ...props 
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-secondary dark:text-slate-300">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className={`absolute inset-y-0 ${isRTL ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center pointer-events-none`}>
            <Icon className="h-5 w-5 text-muted" />
          </div>
        )}
        <input
          className={`input w-full ${Icon ? (isRTL ? 'pl-10' : 'pr-10') : ''} ${error ? 'border-red-500 focus:border-red-500' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};

export default AdminInput;