import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import imageReducer from 'features/shared/components/image/imageSlice';
import authReducer from 'features/shared/reducers/authSlice';
import topbarReducer from 'features/shared/reducers/TopbarSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		image: imageReducer,
		topbar: topbarReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;