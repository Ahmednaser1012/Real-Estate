import { useTranslation } from "react-i18next";
import { BiUser, BiEnvelope, BiPhone } from "react-icons/bi";

const ClientsTable = ({ clients, isLoading, error, onClientSelect }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const textAlign = isRTL ? "text-right" : "text-left";

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className={`px-6 py-3 text-xs font-semibold tracking-wider ${textAlign} text-gray-600 uppercase`}>
              <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                <BiUser className="w-4 h-4" />
                {t("clients.tableHeaders.name")}
              </div>
            </th>
            <th className={`px-6 py-3 text-xs font-semibold tracking-wider ${textAlign} text-gray-600 uppercase`}>
              <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                <BiEnvelope className="w-4 h-4" />
                {t("clients.tableHeaders.email")}
              </div>
            </th>
            <th className={`px-6 py-3 text-xs font-semibold tracking-wider ${textAlign} text-gray-600 uppercase`}>
              <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                <BiPhone className="w-4 h-4" />
                {t("clients.tableHeaders.phone")}
              </div>
            </th>
            <th className={`px-6 py-3 text-xs font-semibold tracking-wider ${textAlign} text-gray-600 uppercase`}>
              {t("clients.tableHeaders.unitType")}
            </th>
            <th className={`px-6 py-3 text-xs font-semibold tracking-wider ${textAlign} text-gray-600 uppercase`}>
              {t("clients.tableHeaders.city")}
            </th>
            <th className={`px-6 py-3 text-xs font-semibold tracking-wider ${textAlign} text-gray-600 uppercase`}>
              {t("clients.tableHeaders.area")}
            </th>
            <th className={`px-6 py-3 text-xs font-semibold tracking-wider ${textAlign} text-gray-600 uppercase`}>
              {t("clients.tableHeaders.message")}
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            <tr key="loading">
              <td colSpan="7" className="py-8 text-center text-gray-500">
                {t("admin.loadingClients")}
              </td>
            </tr>
          ) : error ? (
            <tr key="error">
              <td colSpan="7" className="py-8 text-center text-red-500">
                {t("admin.failedToLoadClients")}
              </td>
            </tr>
          ) : clients.length > 0 ? (
            clients.map((client, index) => (
              <tr
                key={client.id || index}
                className="transition hover:bg-gray-50 cursor-pointer"
                onClick={() => onClientSelect(client)}
              >
                <td className={`px-6 py-4 text-sm text-gray-900 ${textAlign}`}>
                  {client.name}
                </td>
                <td className={`px-6 py-4 text-sm text-gray-700 ${textAlign}`}>
                  {client.email}
                </td>
                <td className={`px-6 py-4 text-sm text-gray-700 ${textAlign}`}>
                  {client.phone}
                </td>
                <td className={`px-6 py-4 text-sm text-gray-700 capitalize ${textAlign}`}>
                  {client.unitType}
                </td>
                <td className={`px-6 py-4 text-sm text-gray-700 ${textAlign}`}>
                  {client.city?.name_en || "-"}
                </td>
                <td className={`px-6 py-4 text-sm text-gray-700 ${textAlign}`}>
                  {client.area?.name_en || "-"}
                </td>
                <td className={`max-w-xs px-6 py-4 text-sm text-gray-700 truncate ${textAlign}`}>
                  {client.message}
                </td>
              </tr>
            ))
          ) : (
            <tr key="no-clients">
              <td colSpan="7" className="py-8 text-center text-gray-500">
                {t("admin.noClientsFound")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsTable;
