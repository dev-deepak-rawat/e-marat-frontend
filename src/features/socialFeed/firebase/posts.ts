/* eslint-disable no-console */
import {
	push,
	ref,
	serverTimestamp,
	get,
	set,
	remove,
	query,
	onChildAdded,
	orderByChild,
} from 'firebase/database';
import { db } from 'config/firebaseDbHelper';
import {
	PostType,
	PostList,
	UserList,
} from 'features/socialFeed/SocialFeedTypes';

export const store = async (
	data: PostType,
	userId: string
): Promise<PostList | false> => {
	try {
		const postsRef = ref(db, 'posts');
		const newPostRef = push(postsRef);
		const newPostKey = newPostRef.key;

		const post = {
			userId,
			text: data.text,
			...(data.picture && { picture: data.picture }),
			createdAt: serverTimestamp(),
		};

		await set(newPostRef, post);

		if (newPostKey) {
			return {
				[newPostKey]: {
					...post,
					createdAt: Date.now(),
				},
			};
		}

		return false;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const index = async (
	users: UserList,
	setUsers: (users: UserList) => void
) => {
	try {
		const postListRef = ref(db, 'posts');
		const response = await get(
			query(postListRef, orderByChild('createdAt'))
		);
		const usersIds: string[] = [];

		onChildAdded(postListRef, async (data) => {
			const { userId } = data.val();

			if (userId && !usersIds.includes(userId) && !users[userId]) {
				usersIds.push(userId);
				const userRef = ref(db, `users/${userId}`);
				const user = await get(userRef);

				setUsers({ ...users, [userId]: user.val() });
			}
		});

		return response.val();
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const destroy = async (postId: string): Promise<boolean> => {
	try {
		// Remove all comments for the post
		const postCommentsRef = ref(db, `post-comments/${postId}`);
		await remove(postCommentsRef);

		// Remove the post
		const postRef = ref(db, `posts/${postId}`);
		await remove(postRef);

		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};
