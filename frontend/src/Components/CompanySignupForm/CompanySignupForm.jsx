import React, { useState } from 'react';
import { MyButton } from '..'; // Adjust the import path as needed
import InputField from '../../utils/InputField'; // Adjust the import path as needed
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const companyFields = [
    {
        labelText: "Company Name",
        labelFor: "company-name",
        id: "company-name",
        name: "companyName",
        type: "text",
        autoComplete: "organization",
        isRequired: true,
        placeholder: "Company Name"
    },
    {
        labelText: "POC Name",
        labelFor: "poc-name",
        id: "poc-name",
        name: "pocName",
        type: "text",
        autoComplete: "name",
        isRequired: true,
        placeholder: "Point Of Contact"
    },
    {
        labelText: "POC National ID Number",
        labelFor: "poc-id",
        id: "poc-id",
        name: "pocId",
        type: "text",
        autoComplete: "id",
        isRequired: true,
        placeholder: "POC National ID Number"
    },
    {
        labelText: "Company NTN",
        labelFor: "company-ntn",
        id: "company-ntn",
        name: "companyNtn",
        type: "text",
        autoComplete: "ntn",
        isRequired: true,
        placeholder: "Company NTN"
    },
    {
        labelText: "Email Address",
        labelFor: "email-address",
        id: "email-address",
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
        labelText: "Company Bio",
        labelFor: "bio",
        id: "bio",
        name: "bio",
        type: "text",
        autoComplete: "organization",
        isRequired: true,
        placeholder: "Tell freelancers about your company",
    }
];

function CompanySignupForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        companyName: '',
        pocName: '',
        pocId: '',
        companyNtn: '',
        email: '',
        password: '',
        bio: '',
    });

    const [files, setFiles] = useState({
        proofOfRegistrationFee: null,
        avatar: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFiles((prevState) => ({
            ...prevState,
            [name]: files[0],
        }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        for (const key in files) {
            if (files[key]) {
                formDataToSend.append(key, files[key]);
            }
        }
        setIsSubmitting(true)

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_API_URL}/company/register`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Company registered successfully:', response.data);
            // Handling success (e.g., redirect, show message, etc.)
            navigate("/login")
        } catch (err) {
            setIsSubmitting(false);
            // error messages from backend 
            if (err.response) {
                const { status, data } = err.response;
                switch (status) {
                    case 400:
                        // For validation errors
                        if (data.errors && data.errors.length > 0) {
                            const errorMessages = data.errors.map(error => error.msg).join(', ');
                            setErrorMessage(errorMessages || "Invalid request. Please check your input.");
                        } else {
                            setErrorMessage(data.message || "Invalid request. Please check your input.");
                        }
                        break;
                    case 404:
                        setErrorMessage("Company with this email already registered. Please log in.");
                        break;
                    case 500:
                        setErrorMessage("Internal server error. Please try again later.");
                        break;
                    default:
                        setErrorMessage("Signup failed. Please try again later.");
                }
            } else {
                setErrorMessage('Network error. Please check your internet connection and try again.');
            }
            console.error('Error registering company:', err);
        }

    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg w-full bg-white p-8 rounded-lg"
        >
            <h2 className="text-4xl font-bold mb-8 text-orange text-center">Company Signup</h2>

            {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-center" role="alert">
                    <span className="inline-block align-middle mr-2">
                        <svg className="w-5 h-5 text-red-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01m-6.93-2a9 9 0 1113.86 0H5.07z" />
                        </svg>
                    </span>
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{errorMessage}</span>
                </div>
            )}



            <form onSubmit={onSubmitHandler}>
                {companyFields.map((field) => (
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
                <div className="mb-6">
                    <label className="block text-sm font-medium">
                        Deposit Receipt
                        <input
                            type="file"
                            name="proofOfRegistrationFee"
                            accept="image/*,application/pdf"
                            className="mt-1 block w-full rounded-lg focus:ring-darkBlue focus:border-darkBlue sm:text-sm"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium">
                        Avatar
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            className="mt-1 block w-full rounded-lg focus:ring-darkBlue focus:border-darkBlue sm:text-sm"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
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

export default CompanySignupForm;
