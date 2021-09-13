/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostList, UserList } from 'features/socialFeed/SocialFeedTypes';

export interface SocialFeedState {
	posts: PostList;
	users: UserList;
}

const initialState: SocialFeedState = {
	posts: {},
	users: {},
};

export const socialFeedSlice = createSlice({
	name: 'socialFeed',
	initialState,
	reducers: {
		setPosts: (state, action: PayloadAction<PostList>) => {
			state.posts = action.payload;
		},
		addUser: (state, action: PayloadAction<UserList>) => {
			state.users = { ...state.users, ...action.payload };
		},
	},
});

export const { setPosts, addUser } = socialFeedSlice.actions;
export default socialFeedSlice.reducer;
