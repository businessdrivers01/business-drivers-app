import React, { useState } from 'react';
import { MyButton } from '..'; // Adjust the import path as needed
import InputField from '../../utils/InputField'; // Adjust the import path as needed
import { motion } from 'framer-motion';
import { registerAdmin } from '../../apis/admin/registerAdmin.js'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";


const adminFields = [
    {
        labelText: "Username",
        labelFor: "username",
        id: "username",
        name: "username",
        type: "text",
        autoComplete: "username",
        isRequired: true,
        placeholder: "Username"
    },
    {
        labelText: "Email Address",
        labelFor: "email",
        id: "email",
        name: "email",
        type: "email",
        autoComplete: "email",
        isRequired: true,
        placeholder: "Email Address"
    },
    {
        labelText: "Password",
        labelFor: "password",
        id: "password",
        name: "password",
        type: "password",
        autoComplete: "new-password",
        isRequired: true,
        placeholder: "Password"
    },
    {
        labelText: "Role",
        labelFor: "role",
        id: "role",
        name: "role",
        type: "text",
        autoComplete: "role",
        isRequired: false,
        placeholder: "Role (optional)"
    },
    {
        labelText: "Admin Signup Key",
        labelFor: "admin-signup-key",
        id: "admin-signup-key",
        name: "adminSignupKey",
        type: "text",
        autoComplete: "off",
        isRequired: true,
        placeholder: "Admin Signup Key"
    }
];

function AdminSignupForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: '',
        adminSignupKey: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await registerAdmin(formData, setErrorMessage, setIsSubmitting);

            // Only navigate if registration is successful
            navigate("/login-admin");
        } catch (err) {
            setIsSubmitting(false);
            console.error('Error registering admin:', err);
        }
    };


    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg w-full bg-white p-8 rounded-lg"
        >
            <h2 className="text-4xl font-bold mb-8 text-orange text-center">Admin Signup</h2>

            {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-center">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{errorMessage}</span>
                </div>
            )}

            <form onSubmit={onSubmitHandler}>
                {adminFields.map((field) => (
                    <InputField
                        key={field.id}
                        labelText={field.labelText}
                        labelFor={field.labelFor}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        autoComplete={field.autoComplete}
                        isRequired={field.isRequired}
                        placeholder={field.placeholder}
                        className="mb-4"
                        value={formData[field.name]}
                        onChange={handleInputChange}
                    />
                ))}

                <div className="login-btn-container flex justify-center">
                    <MyButton
                        isSubmitting={isSubmitting}
                        children='Sign up'
                        type="submit"
                        className="w-full py-3 text-lg rounded-full text-white hover:text-orange"
                    />
                </div>
            </form>
        </motion.div>
    );
}

export default AdminSignupForm;
