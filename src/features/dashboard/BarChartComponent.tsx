import { BarChart, Bar, XAxis, YAxis, Tooltip, LabelList } from 'recharts';
import { useOrientation } from 'config/hooks';
import StyledTitle from 'features/shared/components/styledComponents/StyledTitle';

type BarChartComponentType = {
	data: {
		name: string;
		value: number;
	}[];
	color: string;
};

export default function BarChartComponent({
	data = [],
	color,
}: BarChartComponentType) {
	const { isMobileSize } = useOrientation();
	const slicedData = isMobileSize ? data.slice(0, 5) : data.slice(0, 7);
	const width = Math.max(data.length * 60, 500);
	return (
		<>
			<StyledTitle>Most Availed Amenities</StyledTitle>
			<BarChart
				width={isMobileSize ? 320 : width}
				height={isMobileSize ? 200 : 250}
				data={slicedData}
				className="mt-10"
			>
				<Tooltip />
				<XAxis dataKey="name" />
				<YAxis />
				<Bar dataKey="count" fill={color}>
					<LabelList dataKey="value" position="top" />
				</Bar>
			</BarChart>
		</>
	);
}
