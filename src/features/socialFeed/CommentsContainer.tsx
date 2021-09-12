import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Button, Empty, Input, Modal } from 'antd';
import ErrorFieldStyled from 'features/shared/components/styledComponents/ErrorField.styled';
import Comments from 'features/socialFeed/Comments';
import type { CommentList } from 'features/socialFeed/SocialFeedTypes';
import { useSocialFeed, useAuth } from 'config/hooks';
import {
	index,
	store,
	removeListener,
	destroy,
} from 'features/socialFeed/firebase/comments';

type PropsType = {
	postId?: string;
	setPostId: Dispatch<SetStateAction<string | undefined>>;
};

export default function CommentsContainer({ postId, setPostId }: PropsType) {
	const [comments, setComments] = useState<CommentList>({});
	const [newComment, setNewComment] = useState('');
	const [newCommentErr, setNewCommentErr] = useState('');
	const { posts, users, setUsers } = useSocialFeed();
	const { uniqueId } = useAuth();

	const post = postId ? posts[postId] : undefined;
	let title = '';

	if (post) {
		const { userId } = post;
		const user = users[userId] || {};
		const { firstName = '' } = user;
		title = firstName !== '' ? `Comments on ${firstName}'s post` : '';
	}

	useEffect(() => {
		init();

		return () => {
			removeListener(postId);
		};
	}, [postId]);

	const init = async () => {
		if (postId) {
			setComments({});
			const comnts = await index(postId, setComments, users, setUsers);
			if (comnts) setComments(comnts);
		}
	};

	const writeComment = async () => {
		if (!newComment) {
			setNewCommentErr('Field cannot be empty');
			return;
		}

		if (postId && uniqueId) {
			const comment = await store(postId, uniqueId, newComment);
			if (comment) setComments({ ...comments, ...comment });
		}

		setNewComment('');
		setNewCommentErr('');
	};

	const deleteComment = async (key: string) => {
		if (postId && (await destroy(postId, key))) {
			const updatedComments = { ...comments };
			if (updatedComments[key]) {
				delete updatedComments[key];
				setComments(updatedComments);
			}
		}
	};

	return (
		<Modal
			title={<h3 className="text-xl">{title}</h3>}
			visible={Boolean(postId && post)}
			footer={null}
			onCancel={() => setPostId(undefined)}
			centered
		>
			<div>
				<Input.TextArea
					allowClear={true}
					rows={4}
					value={newComment}
					onChange={({ target }) => setNewComment(target.value)}
					placeholder="Write a comment..."
				/>

				<Button className="mt-2" type="primary" onClick={writeComment}>
					Send
				</Button>
			</div>
			{newCommentErr && (
				<ErrorFieldStyled>{newCommentErr}</ErrorFieldStyled>
			)}

			<div className="mt-5">
				{Object.keys(comments).length === 0 ? (
					<Empty
						image={Empty.PRESENTED_IMAGE_SIMPLE}
						description="No comments yet."
					/>
				) : (
					Object.entries(comments)
						.reverse()
						.map(([key, comment]) => (
							<Comments
								key={key}
								comment={comment}
								postId={key}
								onDelete={deleteComment}
							/>
						))
				)}
			</div>
		</Modal>
	);
}
