import { useState } from "react";
import { BiUser, BiEnvelope, BiPhone, BiX } from "react-icons/bi";
import AdminCard from "../../ui/AdminCard";
import { useGetAllClientsQuery } from "../../../../features/clientsApi";

const ClientsTab = () => {
  const { data: clients = [], isLoading, error } = useGetAllClientsQuery();
  const [selectedClient, setSelectedClient] = useState(null);

  return (
    <AdminCard
      title="Client Register List"
      subtitle="View all clients registered from the website"
      icon={BiUser}
    >
      <div className="mt-4 overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                <div className="flex items-center gap-2">
                  <BiUser className="w-4 h-4" />
                  Name
                </div>
              </th>
              <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                <div className="flex items-center gap-2">
                  <BiEnvelope className="w-4 h-4" />
                  Email
                </div>
              </th>
              <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                <div className="flex items-center gap-2">
                  <BiPhone className="w-4 h-4" />
                  Phone
                </div>
              </th>
              <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                Unit Type
              </th>
              <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                City
              </th>
              <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                Area
              </th>
              <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                Message
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr key="loading">
                <td colSpan="7" className="py-8 text-center text-gray-500">
                  Loading clients...
                </td>
              </tr>
            ) : error ? (
              <tr key="error">
                <td colSpan="7" className="py-8 text-center text-red-500">
                  Failed to load clients.
                </td>
              </tr>
            ) : clients.length > 0 ? (
              clients.map((client, index) => (
                <tr
                  key={client.id || index}
                  className="transition hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedClient(client)}
                >
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {client.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {client.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {client.phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                    {client.unitType}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {client.city?.name_en || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {client.area?.name_en || "-"}
                  </td>
                  <td className="max-w-xs px-6 py-4 text-sm text-gray-700 truncate">
                    {client.message}
                  </td>
                </tr>
              ))
            ) : (
              <tr key="no-clients">
                <td colSpan="7" className="py-8 text-center text-gray-500">
                  No clients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Client Details Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-primary to-secondary px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Client Details</h2>
              <button
                onClick={() => setSelectedClient(null)}
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
                      {selectedClient.name}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Email
                    </p>
                    <p className="text-gray-900 font-medium mt-1 break-all">
                      {selectedClient.email}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Phone
                    </p>
                    <p className="text-gray-900 font-medium mt-1">
                      {selectedClient.phone}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Unit Type
                    </p>
                    <p className="text-gray-900 font-medium mt-1 capitalize">
                      {selectedClient.unitType}
                    </p>
                  </div>
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
                      {selectedClient.city?.name_en || "-"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Area
                    </p>
                    <p className="text-gray-900 font-medium mt-1">
                      {selectedClient.area?.name_en || "-"}
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
                    {selectedClient.message || "No message provided"}
                  </p>
                </div>
              </div>

              {/* Additional Information */}
              {selectedClient.created_at && (
                <div className="border-t pt-4">
                  <p className="text-xs text-gray-500">
                    Registered on:{" "}
                    {new Date(selectedClient.created_at).toLocaleDateString(
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
                onClick={() => setSelectedClient(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminCard>
  );
};

export default ClientsTab;
