import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import MyPayments from 'features/payments/MyPayments';
import { Provider } from 'react-redux';
import { store } from 'config/store';

describe('My Payments', () => {
	it('payments snapshot', () => {
		const tree = renderer
			.create(
				<Provider store={store}>
					<MyPayments />
				</Provider>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('My payments is loading at start', () => {
		const { getByText } = render(
			<Provider store={store}>
				<MyPayments />
			</Provider>
		);
		expect(getByText(/loading.../i)).toBeInTheDocument();
	});
});
