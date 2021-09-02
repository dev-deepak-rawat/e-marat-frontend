/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ImageState {
	imageUrl: string;
	isImageLoading: boolean;
	imageError: string;
}

const initialState: ImageState = {
	imageUrl: '',
	isImageLoading: false,
	imageError: '',
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
		setImageError: (state, action: PayloadAction<string>) => {
			state.imageError = action.payload;
		},
		clearImageState: (state) => {
			state.imageUrl = '';
			state.isImageLoading = false;
			state.imageError = '';
		},
	},
});

export const {
	setImageUrl,
	setIsImageLoading,
	clearImageState,
	setImageError,
} = imageSlice.actions;

export default imageSlice.reducer;
