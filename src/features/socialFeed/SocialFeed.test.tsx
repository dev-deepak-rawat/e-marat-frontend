import SocialFeed from 'features/socialFeed/SocialFeed';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { store } from 'config/store';

it('Social Feed', () => {
	const tree = renderer
		.create(
			<Provider store={store}>
				<SocialFeed />
			</Provider>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
