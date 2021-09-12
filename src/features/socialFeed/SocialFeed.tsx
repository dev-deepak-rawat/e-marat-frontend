import { useState, useEffect } from 'react';
import PageTitle from 'features/shared/components/styledComponents/PageTitle';
import CommentsContainer from 'features/socialFeed/CommentsContainer';
import { index } from 'features/socialFeed/firebase/posts';
import FeedItem from 'features/socialFeed/FeedItem';
import WritePost from 'features/socialFeed/WritePost';
import { useSocialFeed } from 'config/hooks';

export default function SocialFeed() {
	const { posts, setPosts, users, setUsers } = useSocialFeed();
	const [commentingOnPostId, setCommentingOnPostId] = useState<string>();

	useEffect(() => {
		init();
	}, []);

	const init = async () => {
		const feeds = await index(users, setUsers);
		if (feeds) setPosts(feeds);
	};

	return (
		<>
			<PageTitle>Social Feed</PageTitle>

			<div
				className="max-w-screen-sm mx-auto min-h-screen--topbar my-7"
				role="application"
			>
				{Object.entries(posts)
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
