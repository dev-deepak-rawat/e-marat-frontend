import {
	AreaChart as AreaChartComponent,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from 'recharts';
import { useOrientation } from 'config/hooks';
import StyledTitle from 'features/shared/components/styledComponents/StyledTitle';

type AreaChartProps = {
	data: {
		month: string;
		amount: number;
	}[];
};

export default function AreaChart({ data }: AreaChartProps) {
	const { isMobileSize } = useOrientation();
	const slicedData = isMobileSize ? data.slice(0, 5) : data.slice(0, 6);
	const width = Math.max(data.length * 60, 500);
	return (
		<div className="sm:pb-6">
			<StyledTitle className="mb-8">Monthly Revenue</StyledTitle>
			<AreaChartComponent
				width={isMobileSize ? 320 : width}
				height={isMobileSize ? 200 : 250}
				data={slicedData}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="month" />
				<YAxis className="text-xs" />
				<Tooltip />
				<Area
					type="monotone"
					dataKey="amount"
					stroke="#8884d8"
					fill="#8884d8"
				/>
			</AreaChartComponent>
		</div>
	);
}
