/**
 * Name: AuthProvider
 * Description: Initial authentication in routes "src/config/Routes/index.tsx"
 * **/

import React from "react";

const AuthContext = React.createContext(null);

/* For While type is "any" */
const AuthProvider = ({ children }: any) => {
    let access_token = localStorage.getItem('access_token');
    let refresh_token = localStorage.getItem('refresh_token');

    /* For While type is "any" */
    const authentication: any = {
        access_token,
        refresh_token
    }

    return (
        <AuthContext.Provider value={authentication}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return React.useContext(AuthContext);
};

export default AuthProvider;