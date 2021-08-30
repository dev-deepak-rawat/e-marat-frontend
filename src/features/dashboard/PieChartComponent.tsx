import { Space } from 'antd';
import { PieChart, Pie, Cell } from 'recharts';
import { ColoredBox } from 'features/shared/components/styledComponents/ColoredBox';

type PieChartComponentProps = {
	data: {
		name: string;
		value: number;
		color: string;
	}[];
	innerContent?: string;
	title: string;
};

export default function PieChartComponent({
	data,
	innerContent,
	title,
}: PieChartComponentProps) {
	return (
		<div className="">
			<p>{title}</p>
			<PieChart width={350} height={220}>
				{innerContent && (
					<text
						x={125}
						y={130}
						textAnchor="middle"
						dominantBaseline="middle"
					>
						{innerContent}
					</text>
				)}
				<Pie
					data={data}
					cx={120}
					cy={120}
					innerRadius={50}
					outerRadius={70}
					paddingAngle={2}
					dataKey="value"
					nameKey="name"
					isAnimationActive={false}
					label={(entry) => `${(entry.percent * 100).toFixed(0)}%`}
					// label={(entry) => `${entry.name} ${(entry.percent * 100).toFixed(0)}%`}
				>
					{data.map((entry) => (
						<Cell key={entry.name} fill={entry.color} />
					))}
				</Pie>
			</PieChart>
			<div className="flex flex-wrap">
				{data.map((dataItem) => {
					const { name, value, color } = dataItem;
					return (
						<Space key={name} className="mx-4">
							<ColoredBox color={color} />
							<span style={{ color }}>{`${name} ${value}`}</span>
						</Space>
					);
				})}
			</div>
		</div>
	);
}
