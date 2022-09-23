import React, { useState } from 'react';
import env from "react-dotenv";
import { useNavigate } from "react-router-dom";

import { TelkomselLabel } from "../../assets/images"
import { OutlinedTextField, SmallCopy } from "../../components";
import {Box, Button, CircularProgress, Paper, Stack} from "@mui/material";

import Swal from "sweetalert2";

import { IAuthSignIn } from "../../redux/features/auth/interface";



import { useAuth } from "../../config/AuthProvider";

const SignOut: React.FunctionComponent = () => {
    const { setToken }: any = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    setToken('', 'access_token');
    setToken('', 'refresh_token');

    Swal.fire('Sign Out Success', "", "success").then(()=> navigate('/'));

    return (
        <Paper />
    )

}

export default SignOut;
