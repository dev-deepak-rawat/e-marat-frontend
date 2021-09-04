import { Space } from 'antd';
import { PieChart, Pie, Cell } from 'recharts';
import { ColoredBox } from 'features/shared/components/styledComponents/ColoredBox';
import { useOrientation } from 'config/hooks';

type PieChartComponentProps = {
	data: {
		name: string;
		value: number;
		color?: string;
	}[];
	innerContent?: string;
	title: string;
	uniColor?: boolean;
};

export default function PieChartComponent({
	data,
	innerContent,
	title,
	uniColor = false,
}: PieChartComponentProps) {
	const { isMobile } = useOrientation();
	return (
		<div className="border-t-2 pt-1 sm:border-t-0 sm:w-1/2 sm:mb-6 sm:ml-4">
			<p className="sm:mt-5 sm:ml-4">{title}</p>
			<PieChart width={isMobile ? 350 : 400} height={220}>
				{innerContent && (
					<text
						x={isMobile ? 145 : 200}
						y={120}
						textAnchor="middle"
						dominantBaseline="middle"
					>
						{innerContent}
					</text>
				)}
				<Pie
					data={data}
					cx={isMobile ? 145 : 200}
					cy={110}
					innerRadius={50}
					outerRadius={70}
					paddingAngle={2}
					dataKey="value"
					nameKey="name"
					isAnimationActive={false}
					label={(entry) =>
						isMobile && !uniColor
							? `${(entry.percent * 100).toFixed(0)}%`
							: `${entry.name} ${(entry.percent * 100).toFixed(
									0
							  )}%`
					}
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
							{uniColor ? (
								<span>{`${name} ${value}`}</span>
							) : (
								<>
									<ColoredBox color={color} />
									<span
										style={{ color }}
									>{`${name} ${value}`}</span>
								</>
							)}
						</Space>
					);
				})}
			</div>
		</div>
	);
}
