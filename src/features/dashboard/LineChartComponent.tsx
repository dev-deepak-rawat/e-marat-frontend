import { useOrientation } from 'config/hooks';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts';

type LineChartComponentProps = {
	complaintMetas: {
		monthName: string;
		raised: number;
		progress: number;
		resolved: number;
		rejected: number;
	}[];
};

export default function LineChartComponent(props: LineChartComponentProps) {
	const { isMobile } = useOrientation();
	const { complaintMetas } = props;
	const slicedComplaintMetas = complaintMetas.slice(0, isMobile ? 6 : 8);
	return (
		<>
			<p className="text-3xl">
				Last {isMobile ? 6 : 8} months Complaints
			</p>

			<LineChart
				width={isMobile ? 300 : 420}
				height={isMobile ? 200 : 230}
				data={slicedComplaintMetas}
				className="ml-0 pl-0 mt-8"
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="monthName" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line
					type="monotone"
					dataKey="resolved"
					stroke="#00C49F"
					aria-label="Resolved"
					activeDot={{ r: 8 }}
				/>
				<Line type="monotone" dataKey="raised" stroke="#FFBB28" />
				<Line type="monotone" dataKey="rejected" stroke="#FF8042" />
				<Line type="monotone" dataKey="progress" stroke="#0088FE" />
			</LineChart>
		</>
	);
}
