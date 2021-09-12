import MyAmenities from 'features/amenities/MyAmenities';
import renderer from 'react-test-renderer';

it('My Amenities', () => {
	const tree = renderer.create(<MyAmenities />).toJSON();
	expect(tree).toMatchSnapshot();
});
