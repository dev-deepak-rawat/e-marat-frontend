import ReactionsModal from 'features/socialFeed/ReactionsModal';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { store } from 'config/store';

it('Reactions Modal', () => {
	const tree = renderer
		.create(
			<Provider store={store}>
				<ReactionsModal
					isVisible={false}
					setIsVisible={jest.fn()}
					postId={postIdMock}
					postOwner={postOwnerMock}
					totalReactions={totalReactionsMock}
				/>
			</Provider>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

const postIdMock = '-MjP6ufjLnHm8rWFc_wx';

const postOwnerMock = 'John';

const totalReactionsMock = {
	like: 10,
	laugh: 0,
	sad: 10,
	congrats: 40,
	sum: 60,
};
