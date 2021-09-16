import renderer from 'react-test-renderer';
import MyAmenities from 'features/amenities/MyAmenities';

it('My Amenities', () => {
	const tree = renderer.create(<MyAmenities />).toJSON();
	expect(tree).toMatchSnapshot();
});
