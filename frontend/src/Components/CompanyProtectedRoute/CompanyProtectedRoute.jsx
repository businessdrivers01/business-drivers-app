import { Navigate } from "react-router-dom";
// import Cookies from "js-cookie";

const CompanyProtectedRoute = ({ children }) => {
    const isAuthenticated = () => {
        const tokenFromLocalStorage = localStorage.getItem("company");
        // console.log(tokenFromLocalStorage)
        
        // const tokenFromCookies = Cookies.get("company");

        return !!tokenFromLocalStorage;
    };

    return (
        isAuthenticated() ? children : <Navigate to="/login" />
    );
};

export default CompanyProtectedRoute;
