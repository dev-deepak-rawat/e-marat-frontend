/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { db } from 'config/firebaseDbHelper';
import {
	off,
	onValue,
	push,
	ref,
	serverTimestamp,
	set,
} from 'firebase/database';
import { Button, Input } from 'antd';
import { useAuth } from 'config/hooks';
import ErrorFieldStyled from 'features/shared/components/styledComponents/ErrorField.styled';
import Comments from 'features/socialFeed/Comments';
import type { CommentType } from 'features/socialFeed/SocialFeedTypes';

type PostCommentsType = {
	postId?: string;
};

export default function CommentsContainer({
	postId = 'Mitmhw_5rK9d43uJ9LG',
}: PostCommentsType) {
	const [comments, setComments] = useState<CommentType[]>([]);
	const [newComment, setNewComment] = useState('');
	const [newCommentErr, setNewCommentErr] = useState('');

	const { userInfo } = useAuth();
	const { claims } = userInfo || {};
	const { uniqueId, picture, firstName, lastName } = claims || {};

	const commentsRef = ref(db, `post-comments/${postId}`);

	useEffect(() => {
		onValue(commentsRef, (snapshot) => {
			const updatedComments: CommentType[] = [];
			snapshot.forEach((childSnapshot) => {
				const childKey = childSnapshot.key;
				const childData = childSnapshot.val();
				updatedComments.push({ key: childKey, ...childData });
			});
			setComments(updatedComments.reverse());
		});
		return () => {
			off(commentsRef);
		};
	}, []);

	const writeComment = async () => {
		if (!newComment) {
			setNewCommentErr('Field cannot be empty');
			return;
		}
		const newPostRef = push(commentsRef);
		await set(newPostRef, {
			text: newComment,
			userId: uniqueId,
			userIcon: picture,
			name: `${firstName} ${lastName}`,
			createdAt: serverTimestamp(),
		});
		setNewComment('');
		setNewCommentErr('');
	};

	return (
		<>
			<div className="flex">
				<Input
					className="sm:w-4/5 mr-1"
					value={newComment}
					onChange={({ target }) => setNewComment(target.value)}
					placeholder="Write a comment..."
				/>
				<Button
					className="ml-2 sm:w-1/5 rounded"
					type="primary"
					onClick={writeComment}
				>
					Send
				</Button>
			</div>
			{newCommentErr && (
				<ErrorFieldStyled>{newCommentErr}</ErrorFieldStyled>
			)}
			<Comments comments={comments} postId={postId} />
		</>
	);
}
