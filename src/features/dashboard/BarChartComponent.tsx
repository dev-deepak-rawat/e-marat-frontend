import { useOrientation } from 'config/hooks';
import { BarChart, Bar, XAxis, YAxis, Tooltip, LabelList } from 'recharts';

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
	const { isMobile } = useOrientation();
	const slicedData = isMobile ? data.slice(0, 5) : data;
	const width = Math.max(data.length * 60, 600);
	return (
		<>
			<p className="text-xl">Most Availed Amenities</p>
			<BarChart
				width={isMobile ? 320 : width}
				height={isMobile ? 200 : 250}
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
