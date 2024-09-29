import axios from "axios";
import Cookies from "js-cookie";

export const registerAdmin = async (formData, setErrorMessage, setIsSubmitting) => {
    // Validate inputs
    if (!formData.username || !formData.email || !formData.password) {
        setErrorMessage('Please enter all fields: Username, Email, and Password.');
        setIsSubmitting(false); // Make sure to set submitting to false in case of validation failure
        throw new Error('Validation error'); // Throw error to handle in the onSubmitHandler
    }

    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_API_URL}/admin/register`, // Adjust the endpoint accordingly
            {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: formData.role,
                adminSignupKey: formData.adminSignupKey,
            },
            {
                withCredentials: true, // Ensure cookies are handled properly
            }
        );

        if (response.status === 201 && response.data.success) {
            console.log("Admin registration successful!", response.data);

            // Save admin data to localStorage and cookies
            localStorage.setItem('admin', JSON.stringify(response.data));
            Cookies.set('admin', JSON.stringify(response.data), { expires: 7 });

            setIsSubmitting(false);
            return true; // Indicate success
        }
    } catch (err) {
        setIsSubmitting(false);
        // Handle more detailed error messages from backend response
        if (err.response) {
            const { status, data } = err.response;
            switch (status) {
                case 400:
                    // Handle validation errors
                    setErrorMessage(data.message || "Invalid registration credentials. Please check your input.");
                    break;
                case 403:
                    // Handle invalid signup key
                    setErrorMessage(data.message || "Invalid admin signup key.");
                    break;
                default:
                    setErrorMessage("Registration failed. Please try again later.");
            }
        } else {
            setErrorMessage('Network error. Please check your internet connection and try again.');
        }
        console.error('Error registering admin:', err);
        throw err; // Rethrow error to be handled in the onSubmitHandler
    }
};
