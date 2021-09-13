import AmenityTypeTag from 'features/amenities/AmenityTypeTag';
import renderer from 'react-test-renderer';

it('Amenity Type Tag', () => {
	const tree = renderer
		.create(<AmenityTypeTag type="basic" className="h-fit" />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
