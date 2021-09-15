import { useEffect, Dispatch, SetStateAction } from 'react';
import { Modal, Image, Tabs } from 'antd';
import tw from 'twin.macro';
import styled from 'styled-components';
import congratsIcon from 'features/socialFeed/assets/images/congrats.svg';
import laughIcon from 'features/socialFeed/assets/images/laughing.svg';
import likeIcon from 'features/socialFeed/assets/images/like.svg';
import sadIcon from 'features/socialFeed/assets/images/sad.svg';
import userPlaceholderImg from 'assets/images/user-placeholder.svg';
import {
	ReactionType,
	UserReactionListType,
	TotalReactionsType,
} from 'features/socialFeed/SocialFeedTypes';
import { useSocialFeed } from 'config/hooks';
import { loadUsers } from 'features/socialFeed/firebase/reactions';

type PropsType = {
	isVisible: boolean;
	setIsVisible: Dispatch<SetStateAction<boolean>>;
	postId: string;
	postOwner: string;
	reactions?: UserReactionListType;
	totalReactions: TotalReactionsType;
};

export default function ReactionTabs({
	isVisible,
	setIsVisible,
	postId,
	postOwner,
	reactions,
	totalReactions,
}: PropsType) {
	const { users, addUser } = useSocialFeed();
	const title = postOwner !== '' ? `Reactions on ${postOwner}'s post` : '';

	useEffect(() => {
		loadUsers(postId, users, addUser);
	}, []);

	const reactionUI = (type?: ReactionType) =>
		reactions ? (
			Object.entries(reactions)
				.reverse()
				.filter(
					([key, reaction]) =>
						type === undefined || reaction.reaction === type
				)
				.map(([key, reaction]) => {
					const {
						firstName = '',
						lastName = '',
						picture,
					} = users[key] || {};

					return (
						<div key={key} className="flex items-center py-2">
							<Image
								className="rounded-full"
								height={35}
								width={35}
								preview={false}
								src={picture || userPlaceholderImg}
								fallback={userPlaceholderImg}
								alt="User Avatar"
							/>
							<p className="ml-3">{`${firstName} ${lastName}`}</p>
						</div>
					);
				})
		) : (
			<span />
		);

	return (
		<Modal
			title={<h3 className="text-xl">{title}</h3>}
			visible={isVisible}
			footer={null}
			onCancel={() => setIsVisible(false)}
			destroyOnClose={true}
			centered
		>
			<Tabs defaultActiveKey="1">
				<Tabs.TabPane tab={`All  ${totalReactions.sum}`} key="1">
					{reactionUI()}
				</Tabs.TabPane>
				{totalReactions.like > 0 && (
					<Tabs.TabPane
						tab={
							<ReactionContainer>
								<Reaction src={likeIcon} alt="Like Icon" />
								{totalReactions.like}
							</ReactionContainer>
						}
						key="2"
					>
						{reactionUI('like')}
					</Tabs.TabPane>
				)}

				{totalReactions.laugh > 0 && (
					<Tabs.TabPane
						tab={
							<ReactionContainer>
								<Reaction src={laughIcon} alt="Laugh Icon" />
								{totalReactions.laugh}
							</ReactionContainer>
						}
						key="3"
					>
						{reactionUI('laugh')}
					</Tabs.TabPane>
				)}

				{totalReactions.sad > 0 && (
					<Tabs.TabPane
						tab={
							<ReactionContainer>
								<Reaction src={sadIcon} alt="Sad Icon" />
								{totalReactions.sad}
							</ReactionContainer>
						}
						key="4"
					>
						{reactionUI('sad')}
					</Tabs.TabPane>
				)}
				{totalReactions.congrats > 0 && (
					<Tabs.TabPane
						tab={
							<ReactionContainer>
								<Reaction
									src={congratsIcon}
									alt="Congrats Icon"
								/>
								{totalReactions.congrats}
							</ReactionContainer>
						}
						key="5"
					>
						{reactionUI('congrats')}
					</Tabs.TabPane>
				)}
			</Tabs>
		</Modal>
	);
}

const Reaction = styled.img`
	${tw`
		w-10
		px-2
	`}
`;

const ReactionContainer = styled.div`
	${tw`
		flex
		items-center
	`}
`;
