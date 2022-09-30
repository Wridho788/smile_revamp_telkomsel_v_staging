// Redux Toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces
import { IData } from "./interface";

const initialState: IData = {
	access_token: "",
	refresh_token: "",
	expires_in: 0,
	token_type: ""
};

export const auth = createSlice({
	initialState,
	name: "authStore",
	reducers: {
		AUTH_SET_TOKEN: (state, { payload }: PayloadAction<IData>) => {
			state.access_token = payload.access_token;
			state.refresh_token = payload.refresh_token;
			state.expires_in = payload.expires_in;
			state.token_type = payload.token_type;
		},
		AUTH_CLEAR: state => {
			state.access_token = "";
			state.refresh_token = "";
			state.expires_in = 0;
			state.token_type = "";
		}
	}
});

// Mutations
export const { AUTH_SET_TOKEN, AUTH_CLEAR } = auth.actions;

export default auth.reducer;
