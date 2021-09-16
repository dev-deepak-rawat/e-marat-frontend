import { render } from '@testing-library/react';
import ManageAmenities from 'features/amenities/ManageAmenities';

describe('Manage Amenities component', () => {
	it('Manage amenities contains Manage amenites title', () => {
		const { getByText } = render(<ManageAmenities />);

		expect(getByText(/manage amenities/i)).toBeInTheDocument();
	});
});
