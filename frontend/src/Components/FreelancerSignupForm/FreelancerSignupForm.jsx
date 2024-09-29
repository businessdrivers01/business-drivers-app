import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormInput } from '../../FormikFields';
import MyButton from '../MyButton/MyButton';

const validationSchema = Yup.object({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    number: Yup.number().required('Phone number is required'),
    CNIC: Yup.string().required('CNIC number is required'),

    // Skill validation
    skills: Yup.string().required('Skill is required'),

    bankAccount: Yup.string().required('Bank account number is required'),

    // Currently Doing Job validation
    currentlyEmployed: Yup.string().required('Please select if you are currently employed'),

    // Company name validation only if currentlyEmployed is 'yes'
    companyName: Yup.string().test(
        'is-company-name-required',
        'Company name is required when currently employed',
        function (value) {
            const { currentlyEmployed } = this.parent;
            return currentlyEmployed === 'yes' ? !!value : true;
        }
    ),

    proofOfRegistrationFee: Yup.mixed().required('Proof of registration is required'),
    avatar: Yup.mixed(), // Optional
    bio: Yup.string().required('Bio is required'),
    agree: Yup.boolean().oneOf([true], 'You must agree to the terms'),
});





export const FreelancerSignupForm = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting }) => {


        // console.log(values);
        // return;
        const formData = new FormData();
        Object.keys(values).forEach(key => {
            if (key === 'proofOfRegistrationFee' || key === 'avatar') {
                formData.append(key, values[key]);
            } else if (key === 'currentlyEmployed') {
                formData.append('currentlyEmployed', values[key] === 'yes');
            } else {
                formData.append(key, values[key]);
            }
        });

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_API_URL}/freelancer/register`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log(response.data);
            navigate("/login");
        } catch (err) {
            setSubmitting(false);
            if (err.response) {
                const { status, data } = err.response;
                switch (status) {
                    case 400:
                        setErrorMessage(data.errors ? data.errors?.map(error => error.msg).join(', ') : data.message || "Invalid request. Please check your input.");
                        break;
                    case 404:
                        setErrorMessage("Freelancer with this email already registered. Please log in.");
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
            console.error('Error registering freelancer:', err);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center min-h-screen text-orange p-4"
        >
            <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-4xl font-bold mb-8 text-center">Freelancer Signup</h2>

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

                <Formik
                    initialValues={{
                        fullName: '',
                        email: '',
                        password: '',
                        number: '',
                        CNIC: '',
                        skills: '',
                        proofOfRegistrationFee: null,
                        bankAccount: '',
                        currentlyEmployed: '',
                        companyName: '',
                        agree: false,
                        avatar: null,
                        bio: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    validateOnChange={true}
                    validateOnBlur={true}
                >
                    {({ isSubmitting, values, setFieldValue }) => (
                        <Form className="space-y-4">
                            <FormInput name="fullName" type="text" label="Full Name" />
                            <FormInput name="email" type="email" label="Email" />
                            <FormInput name="password" type="password" label="Password" />
                            <FormInput name="number" type="number" label="Phone Number" />
                            <FormInput name="CNIC" type="text" label="CNIC Number" />

                            <FormInput type="text" name="skills" label="Skill" />

                            <div className="mb-4">
                                <label htmlFor="proofOfRegistrationFee" className="block text-gray-700 text-sm font-bold mb-2">
                                    Proof of Registration Fee
                                </label>
                                <input
                                    id="proofOfRegistrationFee"
                                    name="proofOfRegistrationFee"
                                    type="file"
                                    onChange={(event) => {
                                        setFieldValue("proofOfRegistrationFee", event.currentTarget.files[0]);
                                    }}
                                    className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="avatar" className="block text-gray-700 text-sm font-bold mb-2">
                                    Avatar
                                </label>
                                <input
                                    id="avatar"
                                    name="avatar"
                                    type="file"
                                    onChange={(event) => {
                                        setFieldValue("avatar", event.currentTarget.files[0]);
                                    }}
                                    className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange"
                                />
                            </div>

                            <FormInput name="bio" as="textarea" label="Bio" />
                            <FormInput name="bankAccount" type="text" label="Bank Account Number" />

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Currently Doing Job?</label>
                                <div className="space-y-2">
                                    <label className="inline-flex items-center">
                                        <Field type="radio" name="currentlyEmployed" value="yes" className="form-radio" />
                                        <span className="ml-2">Yes</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <Field type="radio" name="currentlyEmployed" value="no" className="form-radio ml-4" />
                                        <span className="ml-2">No</span>
                                    </label>
                                </div>
                            </div>

                            {values.currentlyEmployed === 'yes' && (
                                <FormInput name="companyName" type="text" label="Company Name" />
                            )}

                            <div className="mb-4">
                                <label className="inline-flex items-center">
                                    <Field type="checkbox" name="agree" className="form-checkbox" />
                                    <span className="ml-2 text-sm text-gray-600">I agree that all information is correct</span>
                                </label>
                            </div>

                            <div className="flex justify-center">
                                <MyButton
                                    children='Sign up'
                                    type="submit"
                                    isSubmitting={isSubmitting}
                                    className="w-full py-3 text-2xl rounded-full bg-orange text-white hover:bg-orange-600 transition duration-300 ease-in-out hover:text-orange" />
                            </div>
                        </Form>
                    )}
                </Formik>

                <p className="mt-4 text-center text-gray-600">
                    Already have an account? <NavLink to="/login" className="text-orange hover:underline">Login</NavLink>
                </p>
            </div>

        </motion.div>
    );
};

export default FreelancerSignupForm;