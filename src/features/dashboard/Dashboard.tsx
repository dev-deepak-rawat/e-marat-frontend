import styled from 'styled-components';
import tw from 'twin.macro';
import { useApiCall } from 'config/hooks';
import PageTitle from 'features/shared/components/styledComponents/PageTitle';
import BarChartComponent from 'features/dashboard/BarChartComponent';
import LineChartComponent from 'features/dashboard/LineChartComponent';
import PieChartComponent from 'features/dashboard/PieChartComponent';
import AreaChart from 'features/dashboard/AreaChart';
import { Spin } from 'antd';
import SpinContainer from 'features/shared/components/styledComponents/SpinContainer';

const Divider = styled.div`
	${tw`
        border-b-2
        my-4
        mr-2
    `}
`;

const ChartContainer = styled.div`
	${tw`
        lg:w-2/5
    `}
`;

const ChartRowContainer = styled.div`
	${tw`
        lg:flex
        lg:justify-evenly
    `}
`;

export default function Dashboard() {
	const { data, loading } = useApiCall({
		apiUrl: 'dashboardStats',
		initDataValue: {},
	});
	const { complaints = {}, amenities = [], revenues = [] } = data;
	const { count = {}, byMonth = [] } = complaints;
	const { progress, raised, rejected, resolved } = count;

	const complaintMetas = [
		{ name: 'Resolved', value: resolved, color: '#00C49F' },
		{ name: 'Raised', value: raised, color: '#FFBB28' },
		{ name: 'Rejected', value: rejected, color: '#FF8042' },
		{ name: 'Progress', value: progress, color: '#0088FE' },
	];

	const totalComplaints = progress + raised + rejected + resolved;
	const pieInnerContent = `Total: ${totalComplaints}`;

	return (
		<>
			<PageTitle>Dashboard</PageTitle>

			<div className="bg-white mt-2 pl-2 pt-2 lg:mx-6 lg:mt-6">
				{loading ? (
					<SpinContainer>
						<Spin tip="loading..." />
					</SpinContainer>
				) : (
					<>
						<ChartRowContainer className="mt-1">
							<ChartContainer>
								<PieChartComponent
									data={complaintMetas}
									innerContent={pieInnerContent}
									title="Overall Complaints Status"
								/>
							</ChartContainer>
							<Divider className="lg:border-r-2" />
							<ChartContainer>
								<LineChartComponent complaintMetas={byMonth} />
							</ChartContainer>
						</ChartRowContainer>

						<Divider />

						<ChartRowContainer>
							<ChartContainer>
								<BarChartComponent
									data={amenities}
									color="#F5A962"
								/>
							</ChartContainer>
							<Divider className="lg:border-r-2" />
							<ChartContainer>
								<AreaChart data={revenues} />
							</ChartContainer>
						</ChartRowContainer>

						<Divider />
					</>
				)}
			</div>
		</>
	);
}
