import React from "react";

const PermissionsSection = ({ permissions, onPermissionChange }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Permissions</h3>
      <div className="space-y-3">
        {Object.keys(permissions).map((module) => (
          <div
            key={module}
            className="border border-gray-200 rounded-lg p-4 bg-gray-50"
          >
            <h4 className="font-medium text-gray-800 mb-2 capitalize">
              {module}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.keys(permissions[module]).map((action) => (
                <label
                  key={action}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={permissions[module][action]}
                    onChange={() => onPermissionChange(module, action)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {action}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermissionsSection;
