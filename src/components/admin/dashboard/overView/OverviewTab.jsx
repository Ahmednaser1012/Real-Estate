import React from "react";
import { motion } from "framer-motion";
import { BiBuildings, BiUser, BiMoney, BiEnvelope } from "react-icons/bi";
import AdminCard from "../../ui/AdminCard";
import StatsCard from "../../ui/StatsCard";
import AdminButton from "../../ui/AdminButton";
import PropertiesTable from "./PropertiesTable";

const OverviewTab = () => {
  // Mock data - in real app would come from API
  const stats = [
    {
      title: "Total Properties",
      value: "156",
      icon: BiBuildings,
      color: "blue",
      trend: "up",
      trendValue: "+12%",
    },
    {
      title: "Active Clients",
      value: "89",
      icon: BiUser,
      color: "green",
      trend: "up",
      trendValue: "+8%",
    },
    {
      title: "Monthly Sales",
      value: "24",
      icon: BiMoney,
      color: "yellow",
      trend: "down",
      trendValue: "-3%",
    },
    {
      title: "New Inquiries",
      value: "12",
      icon: BiEnvelope,
      color: "purple",
      trend: "up",
      trendValue: "+15%",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Recent Properties */}
      <AdminCard
        title="Recently Added Properties"
        subtitle="Latest properties added to the system"
        icon={BiBuildings}
        headerActions={
          <AdminButton variant="outline" size="sm">
            View All
          </AdminButton>
        }
      >
        <PropertiesTable />
      </AdminCard>
    </div>
  );
};

export default OverviewTab;
