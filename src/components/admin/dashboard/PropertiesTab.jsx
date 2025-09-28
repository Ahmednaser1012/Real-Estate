import React from 'react';
import { BiBuildings } from 'react-icons/bi';
import AdminCard from '../AdminCard';
import AdminButton from '../AdminButton';

const PropertiesTab = () => {
  return (
    <AdminCard
      title="Property Management"
      subtitle="Manage all properties in the system"
      icon={BiBuildings}
      headerActions={
        <AdminButton variant="primary" size="sm">
          Add New Property
        </AdminButton>
      }
    >
      <div className="text-center py-12">
        <BiBuildings className="w-16 h-16 text-muted mx-auto mb-4" />
        <p className="text-muted">This section will be developed soon</p>
      </div>
    </AdminCard>
  );
};

export default PropertiesTab;