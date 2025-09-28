import React from 'react';
import { BiUser } from 'react-icons/bi';
import AdminCard from '../AdminCard';

const ClientsTab = () => {
  return (
    <AdminCard
      title="Client Management"
      subtitle="View and manage client data"
      icon={BiUser}
    >
      <div className="text-center py-12">
        <BiUser className="w-16 h-16 text-muted mx-auto mb-4" />
        <p className="text-muted">This section will be developed soon</p>
      </div>
    </AdminCard>
  );
};

export default ClientsTab;