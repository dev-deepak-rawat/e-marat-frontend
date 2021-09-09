import { Skeleton, Row, Col, Image, Tooltip } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { DATE_TIME_FORMAT } from 'lib/constants';
import { ClockCircleFilled } from '@ant-design/icons';
import { useApiCall } from 'config/hooks';
import PageTitle from 'features/shared/components/styledComponents/PageTitle';
import Card from 'features/shared/components/styledComponents/Card';
import placeholderImg from 'assets/images/placeholder.svg';
import { AnnouncementType } from './Types';

export default function Announcements({
	showTitle = true,
}: {
	showTitle?: boolean;
}) {
	const { loading, data: announcements } = useApiCall({
		apiUrl: 'announcements',
		initDataValue: [],
	});

	dayjs.extend(relativeTime);

	return (
		<>
			{showTitle && (
				<PageTitle className="bg-transparent">Announcements</PageTitle>
			)}

			<div className="max-w-screen-xl mx-auto my-12">
				{loading ? (
					<Row
						gutter={[
							{ xs: 0, sm: 20, lg: 30 },
							{ xs: 20, sm: 20, lg: 30 },
						]}
						justify="center"
					>
						{[...Array(6)].map((e, i) => (
							/* eslint-disable react/no-array-index-key */
							<Col key={i} md={23} lg={11} className="w-full">
								<Card className="flex rounded">
									<Skeleton.Avatar
										className="xl-avatar my-7"
										shape="square"
										active
									/>
									<div className="pl-6 w-full">
										<Skeleton paragraph active />
										<Skeleton.Input
											className="w-full h-4 rounded mt-2"
											active
										/>
									</div>
								</Card>
							</Col>
						))}
					</Row>
				) : (
					<Row
						gutter={[
							{ xs: 0, sm: 20, lg: 30 },
							{ xs: 20, sm: 20, lg: 30 },
						]}
						justify="center"
					>
						{announcements.map(
							({
								_id,
								title,
								announcement,
								picture,
								createdAt,
							}: AnnouncementType) => (
								<Col
									md={23}
									lg={11}
									key={_id}
									className="w-full"
								>
									<Card className="relative flex flex-col sm:flex-row rounded">
										<div className="flex items-center justify-center my-7">
											<Image
												width={200}
												src={picture || placeholderImg}
												fallback={placeholderImg}
											/>
										</div>
										<div className="sm:pl-6 h-full flex flex-wrap flex-col justify-between break-all">
											<div>
												<h3 className="text-3xl font-medium mb-2">
													{title}
												</h3>
												<p className="mb-2">
													{announcement}
												</p>
											</div>
										</div>
										<Tooltip
											title={dayjs(createdAt).format(
												DATE_TIME_FORMAT
											)}
											className="absolute bottom-2 right-3"
										>
											<div className="flex items-center text-gray-400">
												<ClockCircleFilled />
												<span className="ml-2">
													{dayjs(createdAt).fromNow()}
												</span>
											</div>
										</Tooltip>
									</Card>
								</Col>
							)
						)}
					</Row>
				)}
			</div>
		</>
	);
}
