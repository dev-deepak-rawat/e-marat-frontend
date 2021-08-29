/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
	title: string;
}

const initialState: AuthState = {
	title: '',
};

export const topbarSlice = createSlice({
	name: 'topbar',
	initialState,
	reducers: {
		setTitle: (state, action: PayloadAction<string>) => {
			state.title = action.payload;
		},
	},
});

export const { setTitle } = topbarSlice.actions;
export default topbarSlice.reducer;
