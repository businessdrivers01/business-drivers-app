import React from 'react';
import { Mail, User } from 'lucide-react';

export default function AdminProfile({
  username = "admin_user",
  email = "admin@example.com",

}) {
  return (
    <div className="bg-gray-200 px-6 py-12 rounded-2xl shadow-lg max-w-2xl mx-auto">

<h1 className='text02xl md:text-5xl text-orange my-4 font-bold'>Admin Info</h1>

      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-darkBlue">{username}</h1>
          <p className="text-lightBlue mt-2">{email}</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoItem icon={<User className="text-orange" />} label="Username" value={username} />
        <InfoItem icon={<Mail className="text-orange" />} label="Email" value={email} />
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center space-x-2 p-3 bg-white rounded-md shadow">
      {icon}
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-darkBlue">{value}</p>
      </div>
    </div>
  );
}
