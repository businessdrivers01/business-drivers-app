import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import UserCard from './UserCard';
import getInactiveFreelancers from '../../apis/freelancer/getInactiveFreelancers/getInactiveFreelancers';
import getInactiveCompanies from '../../apis/company/getInactiveCompanies/getInactiveCompanies';
import getActiveFreelancers from '../../apis/freelancer/getActiveFreelancers/getActiveFreelancers';
import getActiveCompanies from '../../apis/company/getActiveCompanies/getActiveCompanies';
import { toggleCompanyStatus } from '../../apis/company/toggleCompanyStatus/toggleCompanyStatus';
import { toggleFreelancerStatus } from '../../apis/freelancer/toggleFreelancerStatus/toggleFreelancerStatus';

const ManageUsers = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [activeFreelancers, setActiveFreelancers] = useState([]);
  const [activeCompanies, setActiveCompanies] = useState([]);
  const [activeTab, setActiveTab] = useState("inactive");

  useEffect(() => {
    fetchInactiveUsers();
  }, []);

  const fetchInactiveUsers = async () => {
    try {
      const freelancersResponse = await getInactiveFreelancers();
      setFreelancers(freelancersResponse);
      const companiesResponse = await getInactiveCompanies();
      setCompanies(companiesResponse);
    } catch (err) {
      console.error('Error fetching inactive users', err);
    }
  };

  const fetchActiveUsers = async () => {
    try {
      const freelancersResponse = await getActiveFreelancers();
      setActiveFreelancers(freelancersResponse);
      const companiesResponse = await getActiveCompanies();
      setActiveCompanies(companiesResponse);
    } catch (err) {
      console.error('Error fetching active users', err);
    }
  };

  const toggleFreelancer = async (id) => {
    try {
      await toggleFreelancerStatus(id);
      if (activeTab === "inactive") {
        await fetchInactiveUsers();
      } else {
        await fetchActiveUsers();
      }
    } catch (err) {
      console.error('Error toggling freelancer', err);
    }
  };

  const toggleCompany = async (id) => {
    try {
      await toggleCompanyStatus(id);
      if (activeTab === "inactive") {
        await fetchInactiveUsers();
      } else {
        await fetchActiveUsers();
      }
    } catch (err) {
      console.error('Error toggling company', err);
    }
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
    if (value === "active") {
      fetchActiveUsers();
    } else {
      fetchInactiveUsers();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6 bg-gray-100 min-h-screen"
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Manage Users</h1>

      <div className="w-full mb-8">
        <div className="flex rounded-md bg-white shadow-sm">
          <button
            onClick={() => handleTabChange("inactive")}
            className={`w-1/2 py-2 px-4 text-sm font-medium rounded-l-md focus:outline-none ${
              activeTab === "inactive"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Inactive Users
          </button>
          <button
            onClick={() => handleTabChange("active")}
            className={`w-1/2 py-2 px-4 text-sm font-medium rounded-r-md focus:outline-none ${
              activeTab === "active"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Active Users
          </button>
        </div>
      </div>

      {activeTab === "inactive" ? (
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Inactive Freelancers</h2>
            {freelancers.map((freelancer) => (
              <UserCard
                key={freelancer._id}
                user={freelancer}
                onToggle={toggleFreelancer}
                isActive={false}
              />
            ))}
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Inactive Companies</h2>
            {companies.map((company) => (
              <UserCard
                key={company._id}
                user={company}
                onToggle={toggleCompany}
                isActive={false}
              />
            ))}
          </section>
        </div>
      ) : (
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Active Freelancers</h2>
            {activeFreelancers.map((freelancer) => (
              <UserCard
                key={freelancer._id}
                user={freelancer}
                onToggle={toggleFreelancer}
                isActive={true}
              />
            ))}
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Active Companies</h2>
            {activeCompanies.map((company) => (
              <UserCard
                key={company._id}
                user={company}
                onToggle={toggleCompany}
                isActive={true}
              />
            ))}
          </section>
        </div>
      )}
    </motion.div>
  );
};

export default ManageUsers;