import { BarChart, Bar, XAxis, YAxis, Tooltip, LabelList } from 'recharts';

type BarChartComponentType = {
	data: {
		name: string;
		value: number;
	}[];
	color: string;
};

export default function BarChartComponent({
	data,
	color,
}: BarChartComponentType) {
	return (
		<>
			<p className="pl-2 my-2">Most Availed Amenities</p>

			<BarChart width={300} height={200} data={data} className="mt-10">
				<Tooltip />
				<XAxis dataKey="name" />
				<YAxis />
				<Bar dataKey="value" fill={color}>
					<LabelList dataKey="value" position="top" />
				</Bar>
			</BarChart>
		</>
	);
}
