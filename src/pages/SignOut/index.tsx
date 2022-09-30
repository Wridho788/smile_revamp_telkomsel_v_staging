// React
import React, { useEffect } from "react";

// React Router DOM
import { useNavigate } from "react-router-dom";

// Material UI
import { Paper } from "@mui/material";

// Swal
import Swal from "sweetalert2";

// Custom Hooks
import { useAppDispatch } from "../../service/hooks";

// Mutations
import { AUTH_CLEAR } from "../../redux/features/auth/auth-store-slice";

const SignOut: React.FunctionComponent = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			// Clear store
			dispatch(AUTH_CLEAR());

			// Navigate to entry point
			navigate("/");

			// Show toast
			Swal.fire("Sign Out Success", "", "success");
		})();
	}, [dispatch, navigate]);

	return <Paper />;
};

export default SignOut;
