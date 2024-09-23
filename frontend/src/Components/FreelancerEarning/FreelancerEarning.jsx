import React from 'react';

const FreelancerEarning = ({ name, skills, earning, testimonial, avatar }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img src={avatar} alt={name} className="w-16 h-16 rounded-full mr-4 object-cover" />
          <div>
            <h2 className="text-xl font-bold text-darkBlue">{name}</h2>
            <p className="text-lightBlue">{skills.join(', ')}</p>
          </div>
        </div>
        <div className="mb-4">
          <span className="text-2xl font-bold text-orange">PKR {earning.toLocaleString()}</span>
          <span className="text-gray-600 ml-2">earned</span>
        </div>
        <p className="text-gray-700 italic">&ldquo;{testimonial}&rdquo;</p>
      </div>
    </div>
  );
};

export default FreelancerEarning;