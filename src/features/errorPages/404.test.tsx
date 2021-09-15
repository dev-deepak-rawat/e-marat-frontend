import Page404 from 'features/errorPages/404';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { store } from 'config/store';

it('404 error page', () => {
	const tree = renderer
		.create(
			<Provider store={store}>
				<Page404 />
			</Provider>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
