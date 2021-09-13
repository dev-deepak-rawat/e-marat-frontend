import AmenitySkeleton from 'features/amenities/AmenitySkeleton';
import renderer from 'react-test-renderer';

it('Amenity Skeleton', () => {
	const tree = renderer.create(<AmenitySkeleton />).toJSON();
	expect(tree).toMatchSnapshot();
});
