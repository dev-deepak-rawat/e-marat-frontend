import { render } from '@testing-library/react';
import MyAmenityView from 'features/amenities/MyAmenityView';

describe('My Amenity View', () => {
	const amenity = {
		type: 'flexible' as 'flexible',
		_id: 'amenity1',
		icon: 'https://res.cloudinary.com/emarat/image/upload/v1630829104/ct7n2c7s4fhdztjyg28y.png',
		name: 'Laundry',
		description: 'Daily laundry service.',
		fee: 400,
	};

	it('if choice is 0 My amenities, then dont show Add button', () => {
		const userAmenities = ['amenity2'];
		const { queryByTestId } = render(
			<MyAmenityView
				{...{
					userAmenities,
					amenity,
					choice: 0,
					addAmenity: jest.fn,
				}}
			/>
		);

		expect(queryByTestId('addButton')).toBe(null);
	});

	it('if choice is (1)All amenity and amenity _id not in userAmenities, show Add button.', () => {
		const userAmenities = ['amenity2'];
		const { getByTestId } = render(
			<MyAmenityView
				{...{
					userAmenities,
					amenity,
					choice: 1,
					addAmenity: jest.fn,
				}}
			/>
		);

		expect(getByTestId('addButton')).toBeInTheDocument();
	});

	it('If basic amenity and choice is all amenity dont show Add button', () => {
		const basicAmenity = { ...amenity, type: 'basic' as 'basic' };
		const userAmenities = ['amenity2'];
		const { queryByTestId } = render(
			<MyAmenityView
				{...{
					userAmenities,
					amenity: basicAmenity,
					choice: 0,
					addAmenity: jest.fn,
				}}
			/>
		);

		expect(queryByTestId('addButton')).toBe(null);
	});

	it('if choice is (1)All amenity and amenity _id is in userAmenities, then dont show Add button.', () => {
		const userAmenities = ['amenity1'];
		const { queryByTestId } = render(
			<MyAmenityView
				{...{
					userAmenities,
					amenity,
					choice: 1,
					addAmenity: jest.fn,
				}}
			/>
		);

		expect(queryByTestId('addButton')).toBe(null);
	});
});
