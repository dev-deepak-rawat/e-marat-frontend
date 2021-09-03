import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts';

const data = [
	{
		name: 'Aug',
		Rejected: 2,
		Pending: 40,
		Resolved: 24,
		'In Progress': 100,
	},
	{
		name: 'Jul',
		Rejected: 43,
		Pending: 51,
		Resolved: 11,
		'In Progress': 53,
	},
	{
		name: 'Jun',
		Rejected: 12,
		Pending: 53,
		Resolved: 23,
		'In Progress': 11,
	},
	{
		name: 'May',
		Rejected: 1,
		Pending: 44,
		Resolved: 21,
		'In Progress': 32,
	},
	{
		name: 'Apr',
		Rejected: 2,
		Pending: 1,
		Resolved: 53,
		'In Progress': 21,
	},
	{
		name: 'Mar',
		Rejected: 12,
		Pending: 32,
		Resolved: 69,
		'In Progress': 77,
	},
];

export default function LineChartComponent() {
	return (
		<div>
			<p className="pl-2 my-2">Last 6 months Complaints</p>
			<LineChart
				width={280}
				height={200}
				data={data}
				className="ml-0 pl-0"
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line
					type="monotone"
					dataKey="Resolved"
					stroke="#00C49F"
					activeDot={{ r: 8 }}
				/>
				<Line type="monotone" dataKey="Pending" stroke="#FFBB28" />
				<Line type="monotone" dataKey="Rejected" stroke="#FF8042" />
				<Line type="monotone" dataKey="In Progress" stroke="#0088FE" />
			</LineChart>
		</div>
	);
}
