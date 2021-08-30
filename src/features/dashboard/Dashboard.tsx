import ContainerCardTitle from 'features/shared/components/styledComponents/ContainerCardTitle';
import BarChartComponent from './BarChartComponent';
import LineChartComponent from './LineChartComponent';
import PieChartComponent from './PieChartComponent';

const complaintMetas = [
	{ name: 'Ongoing', value: 800, color: '#0088FE' },
	{ name: 'Pending', value: 300, color: '#FFBB28' },
	{ name: 'Resolved', value: 300, color: '#00C49F' },
	{ name: 'Rejected', value: 200, color: '#FF8042' },
];

const totalComplaints = complaintMetas.reduce(
	(total, complaint) => total + complaint.value,
	0
);
const pieInnerContent = `Total ${totalComplaints}`;

const amenitiesMetas = [
	{
		name: 'Gym',
		value: 100,
	},
	{
		name: 'Wifi',
		value: 50,
	},
	{
		name: 'Parking',
		value: 20,
	},
	{
		name: 'Laundry',
		value: 105,
	},
	{
		name: 'Theatre',
		value: 10,
	},
	{
		name: 'Yoga',
		value: 60,
	},
];

export default function Dashboard() {
	return (
		<>
			<div className="bg-white pt-2 mt-8 px-2 w-screen">
				<PieChartComponent
					data={complaintMetas}
					innerContent={pieInnerContent}
					title="Overall Complaints Status"
				/>
			</div>
			<div className="bg-white pt-2 mt-4 pl-0 w-screen">
				<LineChartComponent />
			</div>
			<div className="bg-white pt-2 mt-4 pl-0 w-screen">
				<BarChartComponent data={amenitiesMetas} color="#F5A962" />
			</div>
		</>
	);
}
