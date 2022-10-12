import React, { useState } from "react";
import env from "react-dotenv";
import { useNavigate, Navigate } from "react-router-dom";

import { TelkomselLabel } from "../../assets/images";
import { OutlinedTextField, SmallCopy } from "../../components";
import { Box, Button, CircularProgress, Paper, Stack } from "@mui/material";

import Swal from "sweetalert2";

import { IAuthSignIn, IData } from "../../redux/features/auth/interface";

import {
	useSignInMutation,
	useOauthLoginMutation
} from "../../redux/features/auth/auth-api-slice";

// Custom Hooks
import { useAppDispatch } from "../../service/hooks";

// Mutations
import { AUTH_SET_TOKEN } from "../../redux/features/auth/auth-store-slice";

const Auth: React.FunctionComponent = () => {
	const dispatch = useAppDispatch();

	const [username, setUsername] = React.useState<string>("");
	const [password, setPassword] = React.useState<string>("");

	const onHandleUsername = (value: string) => setUsername(value);
	const onHandlePassword = (value: string) => setPassword(value);

	const [oauthLogin] = useOauthLoginMutation();
	const [signIn] = useSignInMutation();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	const onSubmit = async () => {
		setIsLoading(true);

		try {
			const data: IAuthSignIn = {
				username,
				password,
				client_id: env.REACT_APP_CLIENT_ID,
				client_secret: env.REACT_APP_CLIENT_SECRET
			};

			const oauthResponse = await oauthLogin().unwrap();

			// For while type "any"
			const loginResponse = await signIn({
				...data,
				coreToken: oauthResponse?.payload?.access_token
			}).unwrap();

			// Store token to redux
			dispatch(AUTH_SET_TOKEN(loginResponse));

			navigate("/");
		} catch (err: any) {
			console.log("ERROR", err);

			if (typeof err?.data?.message === "string") {
				Swal.fire(err?.data?.message, "", "error");
			} else {
				if (typeof err?.data?.error?.message === "string") {
					Swal.fire(err?.data?.error?.message, "", "warning");
				} else {
					Swal.fire(err?.data?.message?.[0], "", "warning");
				}
			}
		} finally {
			setIsLoading(false);
		}
	};

	const onSuccess = (response: any) => {
		console.log("SUCCESS", response);
	};
	const onFailure = (response: any) => {
		console.error("ERROR", response);
	};

	return (
		<Paper
			elevation={3}
			sx={{ paddingY: 2, width: "500px", margin: "60px auto" }}
		>
			<Box display="block" px="8%">
				<Box display="block">
					<Box display="center" justifyContent="center" alignItems="center">
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

						<Box display="flex" justifyContent="center" paddingY={2}>
							<Button
								variant="outlined"
								onClick={onSubmit}
								sx={{ paddingY: 1 }}
								fullWidth
							>
								{isLoading ? <CircularProgress size={20} /> : "Login"}
							</Button>
						</Box>

						<Box textAlign="center" paddingY={2}>
							<SmallCopy>Copyright &copy; 2022</SmallCopy>
						</Box>
					</Stack>
				</Box>
			</Box>
		</Paper>
	);
};

export default Auth;
