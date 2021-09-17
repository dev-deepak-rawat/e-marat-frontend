import Comments from 'features/socialFeed/Comments';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { store } from 'config/store';

it('Comments', () => {
	const tree = renderer
		.create(
			<Provider store={store}>
				<Comments
					comment={commentMock}
					postId={postIdMock}
					onDelete={jest.fn()}
				/>
			</Provider>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

const commentMock = {
	userId: '612cd04eb5de4926ded914e4',
	text: 'blah blah',
	createdAt: 1631452124591,
};

const postIdMock = '-MjP6ufjLnHm8rWFc_wx';
