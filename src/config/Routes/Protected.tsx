/**
 * Name: Protected
 * Description: protecting your pages "src/pages" in routes "src/config/Routes/index.tsx"
 * Ex: <Protected><Dashboard /></Protected>
 * **/

import { Navigate } from "react-router-dom";

import { useAppSelector } from "../../service/hooks";

// For While Type "any"
const Protected = ({ children }: any) => {
	const access_token = useAppSelector(state => state.auth.access_token);
	const refresh_token = useAppSelector(state => state.auth.refresh_token);

	// Check if user didn't authenticated
	if (!access_token && !refresh_token) {
		return <Navigate to="/login" replace />;
	}

	return children;
};

export default Protected;
