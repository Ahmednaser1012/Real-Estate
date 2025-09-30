import  { useState } from "react";
import {
  BiUser,
  BiEnvelope,
  BiPhone,
  BiMessage,
  BiX,
  BiCalendar,
  BiMap,
} from "react-icons/bi";
import AdminCard from "../AdminCard";

const ClientsTab = () => {
  // Modal state
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample data for registered clients interested
  const [clients] = useState([
    {
      id: 1,
      fullName: "Ahmed Mohamed",
      email: "ahmed.mohamed@email.com",
      phone: "+20 123 456 7890",
      message: "I'm interested in a 3-bedroom apartment in New Cairo",
      registrationDate: "2024-01-15",
      location: "New Cairo, Egypt",
      propertyType: "Apartment",
      
    },
    {
      id: 2,
      fullName: "Sara Ali",
      email: "sara.ali@email.com",
      phone: "+20 111 222 3333",
      message: "Looking for a villa with a garden in 6th of October",
      registrationDate: "2024-01-12",
      location: "6th of October, Egypt",
      propertyType: "Villa",
      
    },
    {
      id: 3,
      fullName: "Mohamed Hassan",
      email: "mohamed.hassan@email.com",
      phone: "+20 100 555 7777",
      message: "Interested in commercial properties in Downtown Cairo",
      registrationDate: "2024-01-10",
      location: "Downtown Cairo, Egypt",
      propertyType: "Commercial",
       
    },
  ]);

  // Handle row click
  const handleRowClick = (client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
  };

  return (
    <AdminCard
      title="Client Register Management "
      subtitle="View and manage client data"
      icon={BiUser}
    >
      <div className="space-y-6">
        {/* Register Client Interested Table */}

        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <BiUser className="w-4 h-4" />
                    Full Name
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <BiEnvelope className="w-4 h-4" />
                    Email Address
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <BiPhone className="w-4 h-4" />
                    Phone Number
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <BiMessage className="w-4 h-4" />
                    Message
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.length > 0 ? (
                clients.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleRowClick(client)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {client.fullName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {client.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {client.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {client.message}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center">
                      <BiUser className="w-12 h-12 text-gray-300 mb-2" />
                      <p className="text-gray-500">No registered clients yet</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Details Modal */}
      {isModalOpen && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <BiUser className="w-6 h-6 text-blue-600" />
                Client Details
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <BiX className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                    Personal Information
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <BiUser className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium text-gray-900">
                          {selectedClient.fullName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <BiEnvelope className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="font-medium text-gray-900">
                          {selectedClient.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <BiPhone className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="font-medium text-gray-900">
                          {selectedClient.phone}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <BiCalendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">
                          Registration Date
                        </p>
                        <p className="font-medium text-gray-900">
                          {selectedClient.registrationDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Property Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                    Property Interest
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <BiMap className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">
                          Preferred Location
                        </p>
                        <p className="font-medium text-gray-900">
                          {selectedClient.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <BiUser className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Property Type</p>
                        <p className="font-medium text-gray-900">
                          {selectedClient.propertyType}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Section */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">
                  Client Message
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <BiMessage className="w-5 h-5 text-gray-500 mt-1" />
                    <p className="text-gray-700 leading-relaxed">
                      {selectedClient.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors">
                Contact Client
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminCard>
  );
};

export default ClientsTab;
