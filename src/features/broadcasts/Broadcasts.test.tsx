import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'config/store';
import Broadcasts from 'features/broadcasts/Broadcasts';

test('renders learn react link', () => {
	const { getByText } = render(
		<Provider store={store}>
			<Broadcasts />
		</Provider>
	);

	expect(getByText(/Broadcast/i)).toBeInTheDocument();
});
