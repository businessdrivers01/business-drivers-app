import axios from 'axios';

export const toggleCompanyStatus = async (id) => {
    try {
        await axios.patch(
            `${import.meta.env.VITE_BACKEND_API_URL}/company/${id}/toggle-status`
        );

        // Optionally, return a confirmation message for UI purposes
        return 'Status updated successfully';
    } catch (error) {
        console.error('Error toggling company status:', error);
        throw error;
    }
};
