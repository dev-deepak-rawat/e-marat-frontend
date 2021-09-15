import { render } from '@testing-library/react';
import ManageComplaints from 'features/complaints/ManageComplaints';
import { Provider } from 'react-redux';
import { store } from 'config/store';

describe('Manage complaints', () => {
	it('if showTitle is true then show manage complaints on screen', () => {
		const { getByText } = render(
			<Provider store={store}>
				<ManageComplaints showTitle={true} />
			</Provider>
		);
		expect(getByText(/Manage Complaints/i)).toBeInTheDocument();
	});

	it('if showTitle is not true then dont show manage complaints on screen', () => {
		const { queryByText } = render(
			<Provider store={store}>
				<ManageComplaints showTitle={false} />
			</Provider>
		);
		expect(queryByText(/Manage Complaints/i)).toBe(null);
	});
});
