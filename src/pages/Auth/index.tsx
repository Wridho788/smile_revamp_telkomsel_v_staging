import React from 'react';
import { useNavigate } from "react-router-dom";

import { TelkomselLabel } from "../../assets/images"
import { OutlinedTextField, SmallCopy } from "../../components";
import {Box, Button, CircularProgress, Paper, Stack} from "@mui/material";

import Swal from "sweetalert2";

import { IAuthSignIn } from "../../redux/features/auth/interface";

import { useSignInMutation } from "../../redux/features/auth/auth-api-slice";

const Auth: React.FunctionComponent = () => {
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [clientId, setClientId] = React.useState<string>("");
    const [clientSecret, setClientSecret] = React.useState<string>("");

    const onHandleUsername = (value: string) => setUsername(value);
    const onHandlePassword = (value: string) => setPassword(value);
    const onHandleClientId = (value: string) => setClientId(value);
    const onHandleClientSecret = (value: string) => setClientSecret(value);

    const [signIn, isLoading] = useSignInMutation();

    const navigate = useNavigate();

    const onSubmit = () => {
        const data: IAuthSignIn = {
            username,
            zpassword: password,
            client_id: clientId,
            client_secret: clientSecret
        };

        // For while type "any"
        signIn(data).then((res: any) => {
            if (res?.data) {
                localStorage.setItem('access_token',res.data.access_token);
                localStorage.setItem('refresh_token', res.data.refresh_token);

                navigate('/', { replace: true });
            } else if (res.error) {
                if (typeof res.error.data.message === 'string') {
                    Swal.fire(res.error.data.message, "", "warning");
                } else {
                    Swal.fire(res.error.data.message[0].message, "", "warning");
                }
            } else {
                Swal.fire(`Error`, "", "warning");
            }
        });
    }

    return (
        <Paper elevation={3} sx={{ paddingY: 2, width: '500px', margin: "60px auto" }}>
            <Box
                display="block"
                px="8%"
            >
                <Box
                    display="block"
                >
                    <Box
                        display="center"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Stack textAlign="center">
                            <img src={TelkomselLabel} alt="Telkomsel Label" height={80} />
                        </Stack>
                    </Box>

                    <Stack spacing={2}>
                        <OutlinedTextField
                            label="Username"
                            placeholder="Username"
                            value={username}
                            variant={"outlined"}
                            direction="column"
                            handleChange={onHandleUsername}
                        />
                        <OutlinedTextField
                            label="Password"
                            placeholder="Password"
                            value={password}
                            variant={"outlined"}
                            direction="column"
                            type="password"
                            handleChange={onHandlePassword}
                        />
                        <OutlinedTextField
                            label="Client ID"
                            placeholder="Client ID"
                            value={clientId}
                            variant={"outlined"}
                            direction="column"
                            handleChange={onHandleClientId}
                        />
                        <OutlinedTextField
                            label="Client Secret"
                            placeholder="Client Secret"
                            value={clientSecret}
                            variant={"outlined"}
                            direction="column"
                            type="password"
                            handleChange={onHandleClientSecret}
                        />

                        <Box display="flex" justifyContent="center" paddingY={2}>
                            <Button variant="outlined" onClick={onSubmit} sx={{ paddingY: 1 }} fullWidth>
                                {!isLoading ? (<CircularProgress size={20} />) : "Login"}
                            </Button>
                        </Box>

                        <Box textAlign="center" paddingY={2}>
                            <SmallCopy>
                                Copyright &copy; 2022
                            </SmallCopy>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </Paper>
    )

}

export default Auth;
