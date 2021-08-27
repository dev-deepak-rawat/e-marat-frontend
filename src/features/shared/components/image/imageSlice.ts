/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ImageState {
	imageUrl: string;
	isImageLoading: boolean;
}

const initialState: ImageState = {
	imageUrl: '',
	isImageLoading: false,
};

export const imageSlice = createSlice({
	name: 'image',
	initialState,
	reducers: {
		setImageUrl: (state, action: PayloadAction<string>) => {
			state.imageUrl = action.payload;
		},
		setIsImageLoading: (state, action: PayloadAction<boolean>) => {
			state.isImageLoading = action.payload;
		},
		clearImageState: (state, action: PayloadAction) => {
			state.imageUrl = '';
			state.isImageLoading = false;
		},
	},
});

export const { setImageUrl, setIsImageLoading, clearImageState } =
	imageSlice.actions;

export default imageSlice.reducer;
