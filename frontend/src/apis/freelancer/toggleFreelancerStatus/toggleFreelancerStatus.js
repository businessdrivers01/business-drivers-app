import axios from 'axios';

export const toggleFreelancerStatus = async (id) => {
    try {
        await axios.patch(
            `${import.meta.env.VITE_BACKEND_API_URL}/freelancer/${id}/toggle-status`
        );

        // Optionally, return a confirmation message for UI purposes
        return 'Status updated successfully';
    } catch (error) {
        console.error('Error toggling freelancer status:', error);
        throw error;
    }
};
