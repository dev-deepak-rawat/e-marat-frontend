/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IdTokenResult } from 'firebase/auth';

export interface AuthState {
	isLoggedIn: boolean;
	isAdmin: boolean;
	userInfo: IdTokenResult | null;
}

const initialState: AuthState = {
	isLoggedIn: false,
	isAdmin: false,
	userInfo: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		saveAuthUser: (state, action: PayloadAction<AuthState>) => ({
			...action.payload,
		}),
		removeAuthUser: (state) => ({ ...initialState }),
	},
});

export const { saveAuthUser, removeAuthUser } = authSlice.actions;
export default authSlice.reducer;
