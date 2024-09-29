import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCurrentAdmin } from './getCurrentAdmin.js';

export const useLogout = () => {
    const admin = getCurrentAdmin()
    const id = admin?._id
    // console.log(id);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Call backend to clear cookies
            await axios
                .post(`${import.meta.env.VITE_BACKEND_API_URL}/admin/logout`, { id }, { withCredentials: true });
            navigate('/login-admin');



            // Redirect to login page
            localStorage.removeItem('admin');
        } catch (error) {
            console.error('Error during logout:', error.message);
        }
    };

    return { handleLogout };
};
