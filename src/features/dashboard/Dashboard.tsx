import { useApiCall } from 'config/hooks';
import PageTitle from 'features/shared/components/styledComponents/PageTitle';
import BarChartComponent from './BarChartComponent';
import LineChartComponent from './LineChartComponent';
import PieChartComponent from './PieChartComponent';

export default function Dashboard() {
	const { data } = useApiCall({
		apiUrl: 'dashboardStats',
		initDataValue: {},
	});
	const { complaints = {}, amenities = [] } = data;
	const { count = {}, byMonth = [] } = complaints;
	const { progress, raised, rejected, resolved } = count;

	const complaintMetas = [
		{ name: 'Ongoing', value: progress, color: '#0088FE' },
		{ name: 'Pending', value: raised, color: '#FFBB28' },
		{ name: 'Resolved', value: resolved, color: '#00C49F' },
		{ name: 'Rejected', value: rejected, color: '#FF8042' },
	];

	const totalComplaints = progress + raised + rejected + resolved;
	const pieInnerContent = `Total ${totalComplaints}`;

	return (
		<>
			<PageTitle>Dashboard</PageTitle>
			<div className="bg-white pt-1 px-2 sm:flex sm:mt-2">
				<PieChartComponent
					data={complaintMetas}
					innerContent={pieInnerContent}
					title="Overall Complaints Status"
				/>
				<LineChartComponent complaintMetas={byMonth} />
			</div>
			<BarChartComponent data={amenities} color="#F5A962" />
		</>
	);
}
