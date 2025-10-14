import { BiUser, BiEnvelope, BiPhone, BiMap, BiMessage } from "react-icons/bi";
import AdminCard from "../../ui/AdminCard";
import { useGetAllClientsQuery } from "../../../../features/clientsApi";

const ClientsTab = () => {
  const { data: clients = [], isLoading, error } = useGetAllClientsQuery();

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
              <tr>
                <td colSpan="7" className="py-8 text-center text-gray-500">
                  Loading clients...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="7" className="py-8 text-center text-red-500">
                  Failed to load clients.
                </td>
              </tr>
            ) : clients.length > 0 ? (
              clients.map((client) => (
                <tr key={client.id} className="transition hover:bg-gray-50">
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
              <tr>
                <td colSpan="7" className="py-8 text-center text-gray-500">
                  No clients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminCard>
  );
};

export default ClientsTab;
