import { useState, useEffect } from 'react';
import { Skeleton } from 'antd';
import PageTitle from 'features/shared/components/styledComponents/PageTitle';
import CommentsContainer from 'features/socialFeed/CommentsContainer';
import { index } from 'features/socialFeed/firebase/posts';
import FeedItem from 'features/socialFeed/FeedItem';
import WritePost from 'features/socialFeed/WritePost';
import { useSocialFeed } from 'config/hooks';

export default function SocialFeed() {
	const [loading, setLoading] = useState<boolean>(true);
	const { posts, setPosts, setPostCommentsCount, users, addUser } =
		useSocialFeed();
	const [commentingOnPostId, setCommentingOnPostId] = useState<string>();

	useEffect(() => {
		init();
	}, []);

	const init = async () => {
		const feeds = await index(users, addUser, setPostCommentsCount);
		if (feeds) setPosts(feeds);
		setLoading(false);
	};

	return (
		<>
			<PageTitle>Social Feed</PageTitle>

			<div
				className="max-w-screen-sm mx-auto min-h-screen--topbar my-7"
				role="application"
			>
				{loading
					? [...Array(3)].map((e, i) => (
							/* eslint-disable react/no-array-index-key */
							<div
								key={i}
								className="shadow-lg rounded-3xl bg-white mb-5"
							>
								<div className="p-4">
									<div className="flex justify-between items-center">
										<div className="flex items-center mb-4 w-full">
											<Skeleton.Avatar
												className="my-7"
												size="large"
												active
											/>
											<div className="pl-6 w-full">
												<Skeleton paragraph active />
											</div>
										</div>
									</div>
								</div>
							</div>
					  ))
					: Object.entries(posts)
							.reverse()
							.map(([key, post]) => (
								<FeedItem
									key={key}
									postId={key}
									setCommentingOn={setCommentingOnPostId}
								/>
							))}

				<CommentsContainer
					postId={commentingOnPostId}
					setPostId={setCommentingOnPostId}
				/>
				<WritePost />
			</div>
		</>
	);
}
