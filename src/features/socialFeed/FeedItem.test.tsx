import FeedItem from 'features/socialFeed/FeedItem';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { store } from 'config/store';

it('Feed Item', () => {
	const tree = renderer
		.create(
			<Provider store={store}>
				<FeedItem setCommentingOn={jest.fn()} postId={postIdMock} />
			</Provider>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

const postIdMock = '-MjP6ufjLnHm8rWFc_wx';
