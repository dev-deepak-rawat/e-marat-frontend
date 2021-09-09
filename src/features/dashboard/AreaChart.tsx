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
		name: string;
		value: number;
	}[];
};

export default function AreaChart({ data }: AreaChartProps) {
	const { isMobile } = useOrientation();
	const slicedData = isMobile ? data.slice(0, 5) : data.slice(0, 6);
	const width = Math.max(data.length * 60, 500);
	return (
		<div className="sm:pb-6">
			<StyledTitle className="mb-8">Monthly Revenue</StyledTitle>
			<AreaChartComponent
				width={isMobile ? 320 : width}
				height={isMobile ? 200 : 250}
				data={slicedData}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis className="text-xs" />
				<Tooltip />
				<Area
					type="monotone"
					dataKey="value"
					stroke="#8884d8"
					fill="#8884d8"
				/>
			</AreaChartComponent>
		</div>
	);
}
