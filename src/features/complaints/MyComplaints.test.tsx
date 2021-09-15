import { render } from '@testing-library/react';
import MyComplaints from 'features/complaints/MyComplaints';
import * as hooks from 'config/hooks';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useLocation: () => ({
		pathname: 'localhost:3000/complaints',
	}),
}));

describe('Announcements', () => {
	it('if api call is loading, show spin loader', () => {
		jest.spyOn(hooks, 'useApiCall').mockImplementation(() => ({
			loading: true,
			data: [],
			isFetchedOnce: false,
		}));
		const { getByText } = render(<MyComplaints />);
		expect(getByText(/loading.../i)).toBeInTheDocument();
	});
});
