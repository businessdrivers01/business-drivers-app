import React, { useState } from 'react';

const SkillDropdown = ({ id, name, value, onChange }) => {
  const [customSkill, setCustomSkill] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    if (value === "Other") {
      // If "Other" is selected, set customSkill to an empty string
      setCustomSkill('');
    }
    onChange(e); // Call the original onChange to update parent state
  };

  const handleCustomSkillChange = (e) => {
    setCustomSkill(e.target.value);
    onChange(e); // Update parent state with the custom skill if needed
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
        Skills
      </label>
      <select
        id={id}
        name={name}
        value={value === customSkill ? "Other" : value} // If the current value matches customSkill, show "Other"
        onChange={handleChange}
        className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange"
        required
      >
        <option value="" disabled>Select a skill</option>
        <option value="Web Development">Web Development</option>
        <option value="Graphic Design">Graphic Design</option>
        <option value="Content Writing">Content Writing</option>
        <option value="Content Writing">Content Writing</option>
        <option value="Content Writing">Content Writing</option>
        <option value="Content Writing">Content Writing</option>
        <option value="Content Writing">Content Writing</option>





        const skills = [
        'Web development',
        'Graphic design',
        'Content creation',
        'Content writing',
        'Video editing',
        'End-to-end-projects',
        'Digital marketing'
    ];

        <option value="Other">Other</option>
      </select>
      {value === "Other" && (
        <input
          type="text"
          placeholder="Enter your skill"
          value={customSkill}
          onChange={handleCustomSkillChange}
          className="w-full mt-2 p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange"
        />
      )}
    </div>
  );
};

export default SkillDropdown;
