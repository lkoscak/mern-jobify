import { Navigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";

const ProtectedRoute = ({ children }) => {
	const { user } = useAppContext();
	return user ? children : <Navigate to="/landing"></Navigate>;
};

export default ProtectedRoute;
