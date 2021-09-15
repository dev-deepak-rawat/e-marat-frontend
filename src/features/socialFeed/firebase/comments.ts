import { Dispatch, SetStateAction } from 'react';
import {
	DatabaseReference,
	push,
	ref,
	serverTimestamp,
	onChildAdded,
	set,
	remove,
	onValue,
	off,
} from 'firebase/database';
import { db } from 'config/firebase';
import {
	UserList,
	CommentList,
	PostCountType,
} from 'features/socialFeed/SocialFeedTypes';
import { loadOnRefLoad } from 'features/socialFeed/firebase/users';
import { get } from 'lib/firebaseApi';

export const index = async (
	postId: string,
	setComments: Dispatch<SetStateAction<CommentList>>,
	users: UserList,
	addUser: (users: UserList) => void
) => {
	const commentsRef = ref(db, `post-comments/${postId}`);

	try {
		onValue(commentsRef, (snapshot) => {
			if (snapshot.val()) {
				loadOnRefLoad(commentsRef, users, addUser);
				setComments(snapshot.val());
			}
		});
	} catch (error) {
		console.error(error);
	}
};

export const store = async (
	postId: string,
	userId: string,
	text: string
): Promise<CommentList | false> => {
	try {
		const commentsRef = ref(db, `post-comments/${postId}`);

		const comment = {
			userId,
			text,
			createdAt: serverTimestamp(),
		};

		const newCommentRef = push(commentsRef);
		const newCommentKey = newCommentRef.key;

		await set(newCommentRef, comment);

		if (newCommentKey) {
			return {
				[newCommentKey]: {
					...comment,
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

export const destroy = async (
	postId: string,
	commentId: string
): Promise<boolean> => {
	try {
		const commentRef = ref(db, `post-comments/${postId}/${commentId}`);
		await remove(commentRef);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const removeListener = (postId?: string) => {
	if (!postId) return;
	const commentsRef = ref(db, `posts/${postId}`);
	off(commentsRef);
};

export const addCommentCount = (
	dbRef: DatabaseReference,
	setCommentsCount: (c: PostCountType) => void
) => {
	onChildAdded(dbRef, async (data) => {
		const postId = data.key;
		if (postId) {
			const response = await get(`post-comments/${postId}`);
			if (typeof response === 'object') {
				setCommentsCount({
					id: postId,
					count: Object.keys(response).length,
				});
			}
		}
	});
};
