import LineChartComponent from 'features/dashboard/LineChartComponent';
import renderer from 'react-test-renderer';

it('Amenity Skeleton', () => {
	const complaintMetas = {
		monthName: 'jan',
		raised: 10,
		progress: 10,
		resolved: 10,
		rejected: 10,
	};
	const tree = renderer
		.create(<LineChartComponent complaintMetas={[complaintMetas]} />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
