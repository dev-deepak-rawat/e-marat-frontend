import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts';
import { useOrientation } from 'config/hooks';
import StyledTitle from 'features/shared/components/styledComponents/StyledTitle';

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
	const { isMobileSize } = useOrientation();
	const { complaintMetas } = props;
	const slicedComplaintMetas = complaintMetas.slice(0, isMobileSize ? 6 : 8);
	return (
		<div className="pb-8">
			<StyledTitle>
				Last {isMobileSize ? 6 : 8} months Complaints
			</StyledTitle>

			<LineChart
				width={isMobileSize ? 300 : 420}
				height={isMobileSize ? 200 : 210}
				data={slicedComplaintMetas}
				className="ml-0 pl-0 mt-8"
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="monthName" />
				<YAxis />
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
				<Tooltip />
				<Legend wrapperStyle={{ position: 'relative' }} />
			</LineChart>
		</div>
	);
}
