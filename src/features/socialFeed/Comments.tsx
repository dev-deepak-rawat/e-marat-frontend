import { Comment, Tooltip, List } from 'antd';
import { ref, remove } from 'firebase/database';
import { db } from 'config/firebaseDbHelper';
import { useAuth } from 'config/hooks';
import dayjs from 'dayjs';
import { DATE_FORMAT } from 'lib/constants';
import { getPrettyDateDiff } from 'lib/utils';
import DeleteOverlay from './DeleteOverlay';
import type { CommentType } from './SocialFeedTypes';

type CommentsType = {
	comments: CommentType[];
	postId: string;
};

export default function Comments({ comments = [], postId }: CommentsType) {
	const { isAdmin, userInfo } = useAuth();
	const { claims } = userInfo || {};
	const { uniqueId } = claims || {};

	const deleteComment = async (key: string) => {
		const commentRef = ref(db, `post-comments/${postId}/${key}`);
		await remove(commentRef);
	};

	return (
		<List
			className="comment-list"
			header={`${comments.length} replies`}
			itemLayout="horizontal"
			dataSource={comments}
			renderItem={({ key, name, userIcon, text, createdAt, userId }) => (
				<div className="flex">
					<Comment
						author={name}
						avatar={userIcon}
						content={text}
						datetime={
							<Tooltip
								title={dayjs(createdAt).format(DATE_FORMAT)}
							>
								<span>
									{getPrettyDateDiff(new Date(createdAt))}
								</span>
							</Tooltip>
						}
					/>
					{(isAdmin || uniqueId === userId) && (
						<DeleteOverlay
							itemKey={key}
							handleClick={deleteComment}
						/>
					)}
				</div>
			)}
		/>
	);
}
