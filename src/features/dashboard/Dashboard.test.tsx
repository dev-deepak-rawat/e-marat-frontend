import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
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

	it('dashboard snapshot on test data', () => {
		jest.spyOn(hooks, 'useApiCall').mockImplementation(() => ({
			loading: true,
			data: dashobardData,
			isFetchedOnce: false,
		}));
		const tree = renderer.create(<Dashboard />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});

const dashobardData = {
	complaints: {
		count: {
			raised: 11,
			progress: 3,
			resolved: 4,
			rejected: 0,
		},
		byMonth: [
			{
				month: 8,
				monthName: 'Sep',
				year: 2021,
				raised: 11,
				progress: 3,
				resolved: 4,
				rejected: 0,
			},
			{
				month: 7,
				monthName: 'Aug',
				year: 2021,
				raised: 0,
				progress: 0,
				resolved: 0,
				rejected: 0,
			},
		],
	},
	amenities: [
		{
			_id: '612d02ade097c5273f606592',
			count: 3,
			name: 'Wifi',
		},
		{
			_id: '613477077dc79e1e210673d0',
			count: 3,
			name: 'Gym',
		},
	],
	revenues: [
		{
			month: 'Sep',
			year: 2021,
			amount: 6522,
		},
		{
			month: 'Aug',
			year: 2021,
			amount: 6199.97,
		},
	],
};
