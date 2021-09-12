import { render } from '@testing-library/react';
import Announcements from 'features/announcements/Announcements';
import * as hooks from 'config/hooks';

describe('Announcements', () => {
	it('if initial load finished and list is empty, then show No Data', () => {
		jest.spyOn(hooks, 'useInfiniteScrollApiCall').mockImplementation(
			() => ({
				setSkip: jest.fn,
				loading: false,
				isFetchedOnce: true,
				list: [],
				isNoMoreData: false,
			})
		);
		const { getByText } = render(<Announcements />);
		expect(getByText('No Data')).toBeInTheDocument();
	});

	it('if loading, then show skeleton component', () => {
		jest.spyOn(hooks, 'useInfiniteScrollApiCall').mockImplementation(
			() => ({
				setSkip: jest.fn,
				loading: true,
				isFetchedOnce: false,
				list: [],
				isNoMoreData: false,
			})
		);
		const { getByTestId } = render(<Announcements />);
		expect(getByTestId('announcementSkeleton')).toBeInTheDocument();
	});
});
