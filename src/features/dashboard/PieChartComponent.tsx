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
	const { isMobile } = useOrientation();
	return (
		<>
			<StyledTitle>{title}</StyledTitle>
			<PieChart width={isMobile ? 355 : 420} height={240}>
				{innerContent && (
					<text
						className="font-semibold"
						x={isMobile ? 155 : 210}
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
					cx={isMobile ? 155 : 210}
					cy={110}
					innerRadius={60}
					outerRadius={85}
					paddingAngle={2}
					dataKey="value"
					nameKey="name"
					isAnimationActive={false}
					label={(entry) =>
						isPayment && !isMobile
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
			{!isPayment ||
				(isMobile && (
					<div className="flex flex-wrap">
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
				))}
		</>
	);
}
