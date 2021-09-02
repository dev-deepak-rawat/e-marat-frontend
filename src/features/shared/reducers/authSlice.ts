/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IdTokenResult } from 'firebase/auth';

export interface AuthState {
	isLoggedIn: boolean;
	isAdmin: boolean;
	userInfo: IdTokenResult | null;
	isLoaded: boolean;
}

const initialState: AuthState = {
	isLoggedIn: false,
	isAdmin: false,
	userInfo: null,
	isLoaded: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		saveAuthUser: (state, action: PayloadAction<AuthState>) => ({
			...action.payload,
		}),
		removeAuthUser: (state) => ({ ...initialState, isLoaded: true }),
	},
});

export const { saveAuthUser, removeAuthUser } = authSlice.actions;
export default authSlice.reducer;
