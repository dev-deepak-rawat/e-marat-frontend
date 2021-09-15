import AreaChart from 'features/dashboard/AreaChart';
import renderer from 'react-test-renderer';

it('Amenity Skeleton', () => {
	const areaChartData = {
		month: 'jan',
		amount: 200,
	};
	const tree = renderer.create(<AreaChart data={[areaChartData]} />).toJSON();
	expect(tree).toMatchSnapshot();
});
