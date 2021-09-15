import { render } from '@testing-library/react';
import PieChart from 'features/dashboard/PieChartComponent';
import { Provider } from 'react-redux';
import { store } from 'config/store';

describe('Pie Chart component', () => {
	const samplePieChartData = { name: 'test', value: 20, color: '#432422' };
	it('If in payment page do not show labels', () => {
		const { queryByTestId } = render(
			<Provider store={store}>
				<PieChart
					isPayment={true}
					data={[samplePieChartData]}
					innerContent="Test"
					title="test"
				/>
			</Provider>
		);
		expect(queryByTestId('pieChartLabels')).toBe(null);
	});
	it('if not payment page, then show label', () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<PieChart
					isPayment={false}
					data={[samplePieChartData]}
					innerContent="Test"
					title="test"
				/>
			</Provider>
		);
		expect(getByTestId('pieChartLabels')).toBeInTheDocument();
	});
});
