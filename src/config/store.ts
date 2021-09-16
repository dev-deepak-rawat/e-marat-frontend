import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import imageReducer from 'features/shared/components/image/imageSlice';
import authReducer from 'features/shared/reducers/authSlice';
import socialFeedReducer from 'features/shared/reducers/SocialFeedSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		image: imageReducer,
		socialFeed: socialFeedReducer,
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
