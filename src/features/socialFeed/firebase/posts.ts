import {
	push,
	ref,
	serverTimestamp,
	get,
	set,
	remove,
	query,
	orderByChild,
} from 'firebase/database';
import { db } from 'config/firebase';
import {
	PostType,
	PostList,
	UserList,
	PostCountType,
} from 'features/socialFeed/SocialFeedTypes';
import { loadOnRefLoad } from 'features/socialFeed/firebase/users';
import { addCommentCount } from 'features/socialFeed/firebase/comments';

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
	addUser: (users: UserList) => void,
	setCommentsCount: (c: PostCountType) => void
) => {
	try {
		const postListRef = ref(db, 'posts');
		const response = await get(
			query(postListRef, orderByChild('createdAt'))
		);

		loadOnRefLoad(postListRef, users, addUser);
		addCommentCount(postListRef, setCommentsCount);

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
