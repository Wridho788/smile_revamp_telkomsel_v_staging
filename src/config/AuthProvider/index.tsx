/**
 * Name: AuthProvider
 * Description: Initial authentication in routes "src/config/Routes/index.tsx"
 * **/

import React, { useState } from "react";

const AuthContext = React.createContext(null);

/* For While type is "any" */
const AuthProvider = ({ children }: any) => {
    const [accessToken, setAccessToken] = useState<any>(localStorage.getItem('access_token'));
    const [refreshToken, setRefreshToken] = useState<any>(localStorage.getItem('refresh_token'));

    const updateToken = (value: string, key: string): void => {

        if (key === 'refresh_token') {
            setRefreshToken(value);
            localStorage.setItem('refresh_token', value);
            setAccessToken(localStorage.getItem('access_token'));
        }

        if (key === 'access_token') {
            setAccessToken(value);
            localStorage.setItem('access_token', value);
            setRefreshToken(localStorage.getItem('refresh_token'));
        }
    };

    /* For While type is "any" */
    const authentication: any = {
        access_token: accessToken,
        refresh_token: refreshToken,
        setToken: updateToken
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