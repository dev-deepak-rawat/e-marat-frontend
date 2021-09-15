import { render } from '@testing-library/react';
import Dashboard from 'features/dashboard/Dashboard';
import * as hooks from 'config/hooks';

describe('Dashboard', () => {
	it('if api call is loading, show spin loader', () => {
		jest.spyOn(hooks, 'useApiCall').mockImplementation(() => ({
			loading: true,
			data: {},
			isFetchedOnce: false,
		}));
		const { getByText } = render(<Dashboard />);
		expect(getByText(/loading.../i)).toBeInTheDocument();
	});
});
