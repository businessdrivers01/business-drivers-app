import React from 'react';
import { getCurrentAdmin } from '../../utils/getCurrentAdmin';
import { AdminProfile } from '../../Components'; 
import { motion } from 'framer-motion';

function AdminProfilePage() {

  const admin = getCurrentAdmin(); // Fetch admin data

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8">

      <AdminProfile {...admin} />

    </motion.div>
  );
}

export default AdminProfilePage;
