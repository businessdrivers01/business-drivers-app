import React from 'react';

const UserCard = ({ user, onToggle, isActive }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{user.fullName || user.companyName}</h3>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={isActive}
              onChange={() => onToggle(user._id)}
            />
            <div className={`block w-14 h-8 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isActive ? 'transform translate-x-6' : ''}`}></div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default UserCard;