import ContainerCard from 'features/shared/components/styledComponents/ContainerCard';
import PageTitle from 'features/shared/components/styledComponents/PageTitle';
import CommentsContainer from 'features/socialFeed/CommentsContainer';

export default function SocialFeed() {
	return (
		<>
			<PageTitle>Social Feeds</PageTitle>
			<ContainerCard size="sm">
				<CommentsContainer />
			</ContainerCard>
		</>
	);
}
