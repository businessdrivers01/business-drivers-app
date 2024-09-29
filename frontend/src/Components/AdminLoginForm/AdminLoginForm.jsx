// AdminLoginForm.jsx
import React, { useState } from 'react';
import InputField from '../../utils/InputField.jsx';
import { loginFields } from '../../utils/formFields.js';
import { MyButton } from '../index.js';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../apis/admin/loginAdmin.js'; // Utility function for admin login
import Cookies from 'js-cookie';

function AdminLoginForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            // Call loginAdmin function to handle the login process
            const responseData = await loginAdmin(formData, setErrorMessage, setIsSubmitting);

            if (responseData) {
                // console.log("Admin login successful!", responseData);

                // Navigate to admin dashboard after successful login
                navigate("/admin-dashboard");
            }

        } catch (err) {
            // Error handling is already done in loginAdmin.js
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-lg w-full bg-white p-8 rounded-lg">
                <h2 className="text-4xl font-bold mb-2 text-darkBlue text-center">Admin Login</h2>
                <p className="text-center text-gray-600 mb-8">
                    Manage the platform with admin access.
                </p>

                {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-center" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline"> {errorMessage}</span>
                    </div>
                )}

                <form onSubmit={onSubmitHandler}>
                    {loginFields.map((field) => (
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
                            className="rounded-full mb-4 w-full p-3 border border-gray-300"
                            value={formData[field.name]}
                            onChange={handleInputChange}
                        />
                    ))}
                    <div className="mb-6">
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox text-darkBlue rounded-full" />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                    </div>
                    <div className="login-btn-container flex justify-center">
                        <MyButton
                            isSubmitting={isSubmitting}
                            type="submit"
                            className="w-full py-3 text-2xl rounded-full text-white hover:text-orange"
                        >
                            Login
                        </MyButton>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Don’t have an account?{' '}
                        <NavLink to="/admin-signup" className="text-darkBlue font-bold">
                            Sign up
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AdminLoginForm;
