import React, { useState } from 'react';

const SkillDropdown = ({ id, name, value, onChange }) => {
    const [customSkill, setCustomSkill] = useState(''); // State for custom skill input
    const [isCustom, setIsCustom] = useState(false); // State to toggle custom input field

    const skills = [
        'Web development',
        'Graphic design',
        'Content creation',
        'Content writing',
        'Video editing',
        'End-to-end-projects',
        'Digital marketing'
    ];

    // Handler for the dropdown change
    const handleDropdownChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue === 'Other') {
            setIsCustom(true); // Show custom input field if "Other" is selected
        } else {
            setIsCustom(false); // Hide custom input field if predefined skill is selected
            onChange(e); // Trigger onChange to set selected skill
        }
    };

    // Handler for custom skill input change
    const handleCustomSkillChange = (e) => {
        setCustomSkill(e.target.value);
        onChange({ target: { name, value: e.target.value } }); // Trigger onChange for custom skill
    };

    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
                Skills
            </label>
            <select
                id={id}
                name={name}
                value={isCustom ? 'Other' : value}
                onChange={handleDropdownChange}
                className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-darkBlue"
                required
            >
                <option value="">Select your skill</option>
                {skills.map((skill, index) => (
                    <option key={index} value={skill}>
                        {skill}
                    </option>
                ))}
                <option value="Other">Write Your Custom Skills</option> {/* Option to add custom skills */}
            </select>

            {/* Show custom skill input field if "Other" is selected */}
            {isCustom && (
                <div className="mt-2">
                    <label htmlFor="customSkill" className="block text-gray-700 text-sm font-bold mb-2">
                        Enter your skills (comma separated)
                    </label>
                    <input
                        type="text"
                        id="customSkill"
                        value={customSkill}
                        onChange={handleCustomSkillChange}
                        className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-darkBlue"
                        placeholder="e.g., React, Node.js, MongoDB"
                    />
                </div>
            )}
        </div>
    );
};

export default SkillDropdown;
