import BarChartComponent from 'features/dashboard/BarChartComponent';
import renderer from 'react-test-renderer';

it('Amenity Skeleton', () => {
	const barChartData = {
		name: 'wifi',
		value: 200,
	};
	const tree = renderer
		.create(<BarChartComponent data={[barChartData]} color="#543345" />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
