/**
 * Name: Protected
 * Description: protecting your pages "src/pages" in routes "src/config/Routes/index.tsx"
 * Ex: <Protected><Dashboard /></Protected>
 * **/

import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";

// For While Type "any"
const Protected = ({ children }: any) => {
    // For While Type "any"
    const { access_token, refresh_token }: any = useAuth();

    if (!access_token && !refresh_token) {
        return <Navigate to="/login" replace />
    }

    return children;
}

export default Protected;