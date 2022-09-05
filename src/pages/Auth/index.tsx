import React, {useEffect, useState} from 'react';
import {useRefreshTokenMutation, useSignInMutation,} from "../../redux/features/auth/auth-api-slice";
import {Box, CircularProgress} from "@mui/material";
import {AuthInitial} from "./auth-initial";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {IData, IResponse} from "../../redux/features/auth/interface";

const Auth: React.FunctionComponent = () => {
    localStorage.clear()
    const nav = useNavigate()
    const token = localStorage.getItem('token')
    const [signIn] = useSignInMutation()
    const [refreshToken] = useRefreshTokenMutation()

    useEffect(() => {
        if (token) {
            refreshToken({}).then((res) => {
                let result: any = res
                let accessToken = result.data.access_token
                let refreshToken = result.data.refresh_token
                localStorage.setItem('refresh_token', refreshToken)
                if (res) {
                    Swal.fire("Success!", "SignIn Success", "success").then(() => nav('/'))
                }
            })
        } else {
            signIn(AuthInitial).then((res) => {
                if (res) {
                    let result: any = res
                    let accessToken = result.data.access_token
                    let refreshToken = result.data.refresh_token
                    localStorage.setItem('access_token', accessToken)
                    localStorage.setItem('refresh_token', refreshToken)
                    Swal.fire("Success!", "SignIn Success", "success").then(() => nav('/'))
                }
            })
        }

        return
    }, [token]);
    return (<p>Process</p>)

}

export default Auth;
