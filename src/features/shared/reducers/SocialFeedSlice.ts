/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	PostList,
	PostCountType,
	UserList,
} from 'features/socialFeed/SocialFeedTypes';

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
		setPostCommentsCount: (state, action: PayloadAction<PostCountType>) => {
			state.posts[action.payload.id].commentsCount = action.payload.count;
		},
		addUser: (state, action: PayloadAction<UserList>) => {
			state.users = { ...state.users, ...action.payload };
		},
	},
});

export const { setPosts, setPostCommentsCount, addUser } =
	socialFeedSlice.actions;
export default socialFeedSlice.reducer;
