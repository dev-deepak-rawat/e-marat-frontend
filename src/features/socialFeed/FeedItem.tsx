import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import dayjs from 'dayjs';
import tw from 'twin.macro';
import styled from 'styled-components';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Image, Tooltip } from 'antd';
import { LikeFilled, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import congratsIcon from 'features/socialFeed/assets/images/congrats.svg';
import laughIcon from 'features/socialFeed/assets/images/laughing.svg';
import likeIcon from 'features/socialFeed/assets/images/like.svg';
import sadIcon from 'features/socialFeed/assets/images/sad.svg';
import DeleteOverlay from 'features/socialFeed/DeleteOverlay';
import { DATE_TIME_FORMAT } from 'lib/constants';
import userPlaceholderImg from 'assets/images/user-placeholder.svg';
import UserInfoPop from 'features/shared/components/UserInfoPop';
import deleteConfirm from 'features/shared/components/deleteConfirm';
import { useSocialFeed, useAuth } from 'config/hooks';
import useLongPress from 'features/socialFeed/hooks/useLongPress';
import {
	ReactionType,
	UserReactionListType,
	TotalReactionsType,
} from 'features/socialFeed/SocialFeedTypes';
import { destroy } from 'features/socialFeed/firebase/posts';
import {
	store as storeReaction,
	destroy as destroyReaction,
} from 'features/socialFeed/firebase/reactions';
import ReactionsModal from 'features/socialFeed/ReactionsModal';
import AvatarImage from 'features/shared/components/image/AvatarImage';

type PropsType = {
	postId: string;
	setCommentingOn: Dispatch<SetStateAction<string | undefined>>;
};

export default function FeedItem({ postId, setCommentingOn }: PropsType) {
	const [reactionContainerVisible, setReactionContainerVisible] =
		useState<boolean>(false);
	const [reactions, setReactions] = useState<
		UserReactionListType | undefined
	>();
	const [reactedByVisible, setReactedByVisible] = useState<boolean>(false);

	const totalReactionsInit = {
		like: 0,
		laugh: 0,
		sad: 0,
		congrats: 0,
		sum: 0,
	};

	const [totalReactions, setTotalReactions] =
		useState<TotalReactionsType>(totalReactionsInit);

	const [uniqueReactionTypes, setUniqueReactionTypes] = useState<
		ReactionType[]
	>([]);
	const { isAdmin, uniqueId } = useAuth();
	const { posts, setPosts, users } = useSocialFeed();

	const post = posts[postId] || {};
	const {
		userId,
		text,
		picture: postPic,
		reactions: dbReactions,
		createdAt,
		commentsCount = 0,
	} = post;

	useEffect(() => {
		setReactions(dbReactions);
		setGivenReactions(dbReactions);
	}, []);

	dayjs.extend(relativeTime);

	const user = users[userId] || {};
	const {
		firstName = '',
		lastName = '',
		phone,
		picture: userPic,
		flat,
	} = user;

	type ClickOrTapEvent<T> =
		| React.MouseEvent<T>
		| React.TouchEvent<T>
		| React.KeyboardEvent<T>;

	const onLongPress = (e: ClickOrTapEvent<HTMLButtonElement>) => {
		setReactionContainerVisible(true);
	};

	const onClick = (e: ClickOrTapEvent<HTMLButtonElement>) => {
		if (reactionContainerVisible) {
			setReactionContainerVisible(false);
		} else if (uniqueId && reactions && reactions[uniqueId]) {
			setPostReaction();
		} else {
			setPostReaction('like');
		}
	};

	const deletePost = (key: string) => {
		deleteConfirm(async () => {
			const updatedPosts = { ...posts };

			if (await destroy(key)) {
				if (updatedPosts[key]) {
					delete updatedPosts[key];
					setPosts(updatedPosts);
				}
			}
		});
	};

	const addOrRemoveCurrentUsersReaction = (r?: ReactionType) => {
		if (uniqueId) {
			const newReactions = { ...reactions };

			// Add reaction
			if (r) {
				newReactions[uniqueId] = {
					reaction: r,
					createdAt: Date.now(),
				};
			} else {
				delete newReactions[uniqueId];
			}

			setReactions(newReactions);
			return newReactions;
		}
		return undefined;
	};

	const setPostReaction = (r?: ReactionType) => {
		const latestReactions = addOrRemoveCurrentUsersReaction(r);

		if (r && uniqueId) {
			storeReaction(postId, uniqueId, r);
			setGivenReactions(latestReactions);
		} else if (uniqueId) {
			destroyReaction(postId, uniqueId);
			setGivenReactions(latestReactions);
		}
	};

	const setGivenReactions = (latestReactions?: UserReactionListType) => {
		if (latestReactions) {
			const totals = { ...totalReactionsInit };
			const uniqueR: ReactionType[] = [];

			Object.entries(latestReactions).forEach(([key, el]) => {
				// Total reaction types are 4 and this array is supposed to be unique
				if (el && el.reaction) {
					totals.sum += 1;
					totals[el.reaction] += 1;

					if (uniqueR.length < 4 && !uniqueR.includes(el.reaction)) {
						uniqueR.push(el.reaction);
					}
				}
			});

			setUniqueReactionTypes(uniqueR);
			setTotalReactions(totals);
		}
	};

	const longPressEvent = useLongPress<HTMLButtonElement>(
		onLongPress,
		onClick
	);

	const reactionClickHandler = (r: ReactionType) => {
		setReactionContainerVisible(false);
		if (uniqueId && reactions && r === reactions[uniqueId]?.reaction) {
			setPostReaction();
		} else {
			setPostReaction(r);
		}
	};

	const singleReaction = () => {
		const re =
			reactions && uniqueId ? reactions[uniqueId]?.reaction : undefined;

		switch (re) {
			case 'like':
				return (
					<>
						<LikeFilled className="text-2xl pr-2 text-blue-500" />
						<span className="text-blue-500 self-end">Liked</span>
					</>
				);

			case 'laugh':
				return (
					<>
						<Reaction src={laughIcon} alt="Laugh Icon" />
						<span className="text-blue-500">Laughed</span>
					</>
				);

			case 'sad':
				return (
					<>
						<Reaction src={sadIcon} alt="Sad Icon" />
						<span className="text-blue-500">Sad</span>
					</>
				);

			case 'congrats':
				return (
					<>
						<Reaction src={congratsIcon} alt="Congrats Icon" />
						<span className="text-blue-500">Congratulated</span>
					</>
				);
			default:
				return (
					<>
						<LikeOutlined className="text-2xl pr-2" />
						<span className="self-end">Like</span>
					</>
				);
		}
	};

	return (
		<>
			<div className="shadow-lg rounded-3xl bg-white mb-5">
				<div className="p-4">
					<div className="flex justify-between items-center">
						<div className="flex items-center mb-4">
							<AvatarImage userImg={userPic} />
							<div className="ml-4">
								<UserInfoPop flat={flat} phone={phone}>
									<h3 className="font-semibold text-lg">{`${firstName} ${lastName}`}</h3>
								</UserInfoPop>

								<Tooltip
									title={dayjs(createdAt).format(
										DATE_TIME_FORMAT
									)}
								>
									<div className="text-gray-500">
										{dayjs(createdAt).fromNow()}
									</div>
								</Tooltip>
							</div>
						</div>

						{(isAdmin || uniqueId === userId) && (
							<DeleteOverlay
								itemKey={postId}
								handleClick={deletePost}
							/>
						)}
					</div>
					<div className="text-center">
						{postPic && (
							<Image
								width="100%"
								src={postPic || userPlaceholderImg}
								fallback={userPlaceholderImg}
							/>
						)}
					</div>

					<p>{text}</p>
				</div>

				<div className="flex py-1 px-6 justify-between">
					<button
						type="button"
						className="flex cursor-pointer"
						onClick={() => setReactedByVisible(true)}
					>
						{uniqueReactionTypes.includes('like') && (
							<ReactionCounter src={likeIcon} alt="Like Icon" />
						)}
						{uniqueReactionTypes.includes('laugh') && (
							<ReactionCounter
								src={laughIcon}
								alt="Laughing Icon"
							/>
						)}
						{uniqueReactionTypes.includes('sad') && (
							<ReactionCounter src={sadIcon} alt="Sad Icon" />
						)}
						{uniqueReactionTypes.includes('congrats') && (
							<ReactionCounter
								src={congratsIcon}
								alt="Congrats Icon"
							/>
						)}

						<span className="ml-2">{totalReactions.sum || ''}</span>
					</button>

					{commentsCount > 0 && (
						<button
							type="button"
							onClick={() => setCommentingOn(postId)}
						>
							{commentsCount} Comment{commentsCount > 1 && 's'}
						</button>
					)}
				</div>

				<div className="flex border-t border-gray-200 px-5">
					<div className="flex-1 relative">
						{reactionContainerVisible && (
							<div className="absolute flex -top-10 left-2/4 transform -translate-x-2/4 bg-white shadow-lg rounded-lg px-3 py-2 border border-gray-200 w-max">
								<Reaction
									className="transform hover:scale-125"
									src={likeIcon}
									alt="Like Icon"
									onClick={() => reactionClickHandler('like')}
								/>
								<Reaction
									className="transform hover:scale-125"
									src={laughIcon}
									alt="Laughing Icon"
									onClick={() =>
										reactionClickHandler('laugh')
									}
								/>
								<Reaction
									className="transform hover:scale-125"
									src={sadIcon}
									alt="Sad Icon"
									onClick={() => reactionClickHandler('sad')}
								/>
								<Reaction
									className="transform hover:scale-125"
									src={congratsIcon}
									alt="Congrats Icon"
									onClick={() =>
										reactionClickHandler('congrats')
									}
								/>
							</div>
						)}
						<FButton
							type="button"
							className="border-r"
							data-key={postId}
							{...longPressEvent}
						>
							{singleReaction()}
						</FButton>
					</div>

					<div className="flex-1">
						<FButton
							type="button"
							onClick={() => setCommentingOn(postId)}
						>
							<MessageOutlined className="text-2xl pr-2" />
							Comment
						</FButton>
					</div>
				</div>
			</div>

			{reactedByVisible && (
				<ReactionsModal
					isVisible={reactedByVisible}
					setIsVisible={setReactedByVisible}
					postId={postId}
					postOwner={firstName}
					reactions={reactions}
					totalReactions={totalReactions}
				/>
			)}
		</>
	);
}

const FButton = styled.button`
	${tw`
		w-full
		items-center
		py-3
		border-gray-200
		flex
		justify-center
	`}
`;

const Reaction = styled.img`
	${tw`
		pr-2
		w-10
		transition
		duration-300
		cursor-pointer
	`}
`;

const ReactionCounter = styled.img`
	${tw`
		w-5
		-mr-1
	`}
`;
