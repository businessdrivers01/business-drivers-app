import { Navigate } from "react-router-dom";
// import Cookies from "js-cookie";

const AdminProtectedRoute = ({ children }) => {
    const isAuthenticated = () => {
        const tokenFromLocalStorage = localStorage.getItem("admin");
        // console.log(tokenFromLocalStorage)

        // const tokenFromCookies = Cookies.get("company");

        return !!tokenFromLocalStorage;
    };

    return (
        isAuthenticated() ? children : <Navigate to="/login-admin" />
    );
};

export default AdminProtectedRoute;
