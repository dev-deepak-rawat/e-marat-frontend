import CommentsContainer from 'features/socialFeed/CommentsContainer';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { store } from 'config/store';

it('Comments Container', () => {
	const tree = renderer
		.create(
			<Provider store={store}>
				<CommentsContainer postId={postIdMock} setPostId={jest.fn()} />
			</Provider>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

const postIdMock = '-MjP6ufjLnHm8rWFc_wx';
