import styled from 'styled-components';
import tw from 'twin.macro';
import { useApiCall } from 'config/hooks';
import PageTitle from 'features/shared/components/styledComponents/PageTitle';
import BarChartComponent from 'features/dashboard/BarChartComponent';
import LineChartComponent from 'features/dashboard/LineChartComponent';
import PieChartComponent from 'features/dashboard/PieChartComponent';
import AreaChart from 'features/dashboard/AreaChart';

const Divider = styled.div`
	${tw`
        border-b-2
        my-4
        mr-2
    `}
`;

const ChartContainer = styled.div`
	${tw`
        sm:w-2/5
    `}
`;

const ChartRowContainer = styled.div`
	${tw`
        sm:flex
        sm:justify-evenly
    `}
`;

const areaData = [
	{
		name: 'Sep',
		value: 4000,
	},
	{
		name: 'Aug',
		value: 3000,
	},
	{
		name: 'Jul',
		value: 9800,
	},
	{
		name: 'Jun',
		value: 3908,
	},
	{
		name: 'May',
		value: 1890,
	},
	{
		name: 'Apr',
		value: 2500,
	},
	{
		name: 'Mar',
		value: 2100,
	},
];

export default function Dashboard() {
	const { data } = useApiCall({
		apiUrl: 'dashboardStats',
		initDataValue: {},
	});
	const { complaints = {}, amenities = [] } = data;
	const { count = {}, byMonth = [] } = complaints;
	const { progress, raised, rejected, resolved } = count;

	const complaintMetas = [
		{ name: 'Ongoing', value: progress, color: '#0088FE' },
		{ name: 'Pending', value: raised, color: '#FFBB28' },
		{ name: 'Resolved', value: resolved, color: '#00C49F' },
		{ name: 'Rejected', value: rejected, color: '#FF8042' },
	];

	const totalComplaints = progress + raised + rejected + resolved;
	const pieInnerContent = `Total ${totalComplaints}`;

	return (
		<>
			<PageTitle>Dashboard</PageTitle>
			<div className="bg-white mt-2 pl-2 pt-2 sm:mx-6 sm:mt-2">
				<ChartRowContainer className="mt-1">
					<ChartContainer>
						<PieChartComponent
							data={complaintMetas}
							innerContent={pieInnerContent}
							title="Overall Complaints Status"
						/>
					</ChartContainer>
					<Divider className="sm:border-r-2" />
					<ChartContainer>
						<LineChartComponent complaintMetas={byMonth} />
					</ChartContainer>
				</ChartRowContainer>

				<Divider />

				<ChartRowContainer>
					<ChartContainer>
						<BarChartComponent data={amenities} color="#F5A962" />
					</ChartContainer>
					<Divider className="sm:border-r-2" />
					<ChartContainer>
						<AreaChart data={areaData} />
					</ChartContainer>
				</ChartRowContainer>

				<Divider />
			</div>
		</>
	);
}
