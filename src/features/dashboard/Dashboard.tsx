import { Row, Col } from 'antd';
import { useApiCall } from 'config/hooks';
import PageTitle from 'features/shared/components/styledComponents/PageTitle';
import Card from 'features/shared/components/styledComponents/Card';
import BarChartComponent from './BarChartComponent';
import LineChartComponent from './LineChartComponent';
import PieChartComponent from './PieChartComponent';

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
			<div className="my-8">
				<Row
					gutter={[
						{ xs: 0, sm: 20, lg: 20 },
						{ xs: 20, sm: 20, lg: 20 },
					]}
					justify="center"
				>
					<Col md={23} lg={11}>
						<Card className="mb-6">
							<PieChartComponent
								data={complaintMetas}
								innerContent={pieInnerContent}
								title="Overall Complaints Status"
							/>
						</Card>
					</Col>
					<Col md={23} lg={11}>
						<Card className="mb-6">
							<LineChartComponent complaintMetas={byMonth} />
						</Card>
					</Col>
					<Col md={23} lg={22}>
						<Card className="mb-6">
							<BarChartComponent
								data={amenities}
								color="#F5A962"
							/>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	);
}
