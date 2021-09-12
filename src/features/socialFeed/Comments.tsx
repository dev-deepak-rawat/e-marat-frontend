import { Comment, Tooltip } from 'antd';
import { useSocialFeed, useAuth } from 'config/hooks';
import dayjs from 'dayjs';
import { DATE_FORMAT } from 'lib/constants';
import relativeTime from 'dayjs/plugin/relativeTime';
import UserInfoPop from 'features/shared/components/UserInfoPop';
import DeleteOverlay from 'features/socialFeed/DeleteOverlay';
import type { CommentType } from 'features/socialFeed/SocialFeedTypes';

type PropsType = {
	comment: CommentType;
	postId: string;
	onDelete: (key: string) => unknown;
};

export default function Comments({
	comment: { userId, text, createdAt },
	postId,
	onDelete,
}: PropsType) {
	const { isAdmin, uniqueId } = useAuth();
	const { users } = useSocialFeed();

	dayjs.extend(relativeTime);

	const user = users[userId] || {};
	const { firstName = '', lastName = '', phone, picture, flat } = user;

	return (
		<div className="flex">
			<Comment
				className="w-full"
				author={
					<UserInfoPop flat={flat} phone={phone}>
						{`${firstName} ${lastName}`}
					</UserInfoPop>
				}
				avatar={picture}
				content={text}
				datetime={
					<Tooltip title={dayjs(createdAt).format(DATE_FORMAT)}>
						<span>{dayjs(createdAt).fromNow()}</span>
					</Tooltip>
				}
			/>
			{(isAdmin || uniqueId === userId) && (
				<DeleteOverlay itemKey={postId} handleClick={onDelete} />
			)}
		</div>
	);
}
