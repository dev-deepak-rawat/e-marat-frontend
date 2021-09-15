import MasterLayout from 'features/shared/navigations/MasterLayout';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'config/store';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useLocation: () => ({
		pathname: 'localhost:3000/complaints',
	}),
}));

it('Master Layout snapshot', () => {
	const tree = renderer
		.create(
			<Provider store={store}>
				<BrowserRouter>
					<MasterLayout />
				</BrowserRouter>
			</Provider>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
