import { Navigate } from "react-router-dom";
// import Cookies from "js-cookie";

const FreelancerProtectedRoute = ({ children }) => {
    const isAuthenticated = () => {
        const tokenFromLocalStorage = localStorage.getItem("user")
        // const tokenFromCookies = Cookies.get("user")

        return !!tokenFromLocalStorage;
    };

    return (
        isAuthenticated() ? children : <Navigate to="/login" />
    );
};

export default FreelancerProtectedRoute;
