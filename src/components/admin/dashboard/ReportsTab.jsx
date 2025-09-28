import React from 'react';
import { BiMoney } from 'react-icons/bi';
import AdminCard from '../AdminCard';

const ReportsTab = () => {
  return (
    <AdminCard
      title="Reports & Analytics"
      subtitle="View financial reports and statistics"
      icon={BiMoney}
    >
      <div className="text-center py-12">
        <BiMoney className="w-16 h-16 text-muted mx-auto mb-4" />
        <p className="text-muted">This section will be developed soon</p>
      </div>
    </AdminCard>
  );
};

export default ReportsTab;