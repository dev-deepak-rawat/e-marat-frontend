import { render } from '@testing-library/react';
import Broadcasts from 'features/broadcasts/Broadcasts';
import { Provider } from 'react-redux';
import { store } from 'config/store';

describe('Broadcasts', () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<Broadcasts />
		</Provider>
	);

	it('On intial load Broadcasts should be active and broadcast form should show.', () => {
		expect(getByTestId('genericForm')).toBeInTheDocument();
	});
});
