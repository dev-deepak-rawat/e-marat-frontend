import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import imageReducer from 'features/shared/components/image/imageSlice';
import authReducer from 'features/shared/reducers/authSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		image: imageReducer,
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
