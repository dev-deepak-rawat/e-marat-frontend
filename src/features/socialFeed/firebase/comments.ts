import { Dispatch, SetStateAction } from 'react';
import {
	push,
	ref,
	serverTimestamp,
	set,
	remove,
	onValue,
	off,
} from 'firebase/database';
import { db } from 'config/firebaseDbHelper';
import { UserList, CommentList } from 'features/socialFeed/SocialFeedTypes';

export const index = async (
	postId: string,
	setComments: Dispatch<SetStateAction<CommentList>>,
	users: UserList,
	setUsers: (users: UserList) => void
): Promise<CommentList | false> => {
	const commentsRef = ref(db, `post-comments/${postId}`);

	try {
		onValue(
			commentsRef,
			(snapshot) => {
				if (snapshot.val()) setComments(snapshot.val());
			},
			{
				onlyOnce: true,
			}
		);

		return false;
	} catch (error) {
		console.error(error);
		return false;
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
