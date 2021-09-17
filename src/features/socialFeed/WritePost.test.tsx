import WritePost from 'features/socialFeed/WritePost';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { store } from 'config/store';

it('Write Post', () => {
	const tree = renderer
		.create(
			<Provider store={store}>
				<WritePost />
			</Provider>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
