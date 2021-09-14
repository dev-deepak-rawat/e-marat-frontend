import { Space } from 'antd';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { ColoredBox } from 'features/shared/components/styledComponents/ColoredBox';
import { useOrientation } from 'config/hooks';
import StyledTitle from 'features/shared/components/styledComponents/StyledTitle';

type PieChartComponentProps = {
	data: {
		name: string;
		value: number;
		color?: string;
	}[];
	innerContent?: string;
	title: string;
	isPayment?: boolean;
};

export default function PieChartComponent({
	data,
	innerContent,
	title,
	isPayment = false,
}: PieChartComponentProps) {
	const { isMobileSize } = useOrientation();
	return (
		<>
			<StyledTitle>{title}</StyledTitle>
			<PieChart width={isMobileSize ? 355 : 420} height={240}>
				{innerContent && (
					<text
						className="font-semibold"
						x={isMobileSize ? 155 : 210}
						y={120}
						textAnchor="middle"
						dominantBaseline="middle"
						fill="#374151"
					>
						{innerContent}
					</text>
				)}
				<Pie
					data={data}
					cx={isMobileSize ? 155 : 210}
					cy={110}
					innerRadius={60}
					outerRadius={85}
					paddingAngle={2}
					dataKey="value"
					nameKey="name"
					isAnimationActive={false}
					label={(entry) =>
						isPayment && !isMobileSize
							? `${entry.name} ${(entry.percent * 100).toFixed(
									0
							  )}%`
							: `${(entry.percent * 100).toFixed(0)}%`
					}
				>
					{data.map((entry) => (
						<Cell key={entry.name} fill={entry.color} />
					))}
				</Pie>
				<Tooltip />
			</PieChart>
			{(!isPayment || isMobileSize) && (
				<div data-testid="pieChartLabels" className="flex flex-wrap">
					{data.map((dataItem) => {
						const { name, color } = dataItem;
						return (
							<Space key={name} className="mx-4">
								<>
									<ColoredBox color={color} />
									<span style={{ color }}>{name}</span>
								</>
							</Space>
						);
					})}
				</div>
			)}
		</>
	);
}
