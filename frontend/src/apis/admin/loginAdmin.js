// loginAdmin.js
import axios from 'axios';
import Cookies from 'js-cookie';

export const loginAdmin = async (formData, setErrorMessage, setIsSubmitting) => {
    try {
        // Ensure email and password are provided
        if (!formData.email || !formData.password) {
            setErrorMessage('Please enter both Email and Password.');
            setIsSubmitting(false);
            return;
        }

        setIsSubmitting(true); // Start the submitting process

        // Send login request
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_API_URL}/admin/login`, // Adjust endpoint based on your config
            {
                email: formData.email,
                password: formData.password,
            },
            {
                withCredentials: true, // Ensure credentials (cookies) are included
            }
        );

        if (response.status === 200 && response.data.success) {
            console.log("Admin logged in successfully!", response.data.data);

            // Store admin details in localStorage and cookies
            localStorage.setItem('admin', JSON.stringify(response.data.data.admin));
            Cookies.set('accessToken', response.data.data.accessToken, { expires: 7, secure: true });
            Cookies.set('refreshToken', response.data.data.refreshToken, { expires: 7, secure: true });

            setIsSubmitting(false); // End submitting process

            // Return response data to handle navigation in calling function
            return response.data;
        }

    } catch (err) {
        setIsSubmitting(false); // End submitting process

        // Handle errors based on backend response
        if (err.response) {
            const { status, data } = err.response;
            switch (status) {
                case 400:
                    setErrorMessage(data.message || "Invalid login credentials.");
                    break;
                case 404:
                    setErrorMessage(data.message || "Admin not found.");
                    break;
                default:
                    setErrorMessage("Login failed. Please try again later.");
            }
        } else {
            setErrorMessage("Network error. Please check your connection and try again.");
        }
        // Rethrow error if needed by higher-level handler
        throw err;
    }
};
