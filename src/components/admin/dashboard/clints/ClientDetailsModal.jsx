import { BiUser, BiX } from "react-icons/bi";

const ClientDetailsModal = ({ client, isOpen, onClose }) => {
  if (!isOpen || !client) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary to-secondary px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Client Details</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-800 p-1 rounded transition"
          >
            <BiX className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BiUser className="w-5 h-5 text-blue-600" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Name
                </p>
                <p className="text-gray-900 font-medium mt-1">
                  {client.name}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Email
                </p>
                <p className="text-gray-900 font-medium mt-1 break-all">
                  {client.email}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Phone
                </p>
                <p className="text-gray-900 font-medium mt-1">
                  {client.phone}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Unit Type
                </p>
                <p className="text-gray-900 font-medium mt-1 capitalize">
                  {client.unitType}
                </p>
              </div>
            </div>
          </div>

          {/* Project Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Project Information
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Project
              </p>
              <p className="text-gray-900 font-medium mt-1">
                {client.project?.title_en || client.project?.title_ar || "-"}
              </p>
            </div>
          </div>

          {/* Location Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Location Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  City
                </p>
                <p className="text-gray-900 font-medium mt-1">
                  {client.city?.name_en || "-"}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Area
                </p>
                <p className="text-gray-900 font-medium mt-1">
                  {client.area?.name_en || "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Message
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {client.message || "No message provided"}
              </p>
            </div>
          </div>

          {/* Additional Information */}
          {client.created_at && (
            <div className="border-t pt-4">
              <p className="text-xs text-gray-500">
                Registered on:{" "}
                {new Date(client.created_at).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsModal;
