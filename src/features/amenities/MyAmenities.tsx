import { Skeleton, Row, Col, Image } from 'antd';
import { useApiCall } from 'config/hooks';
import PageTitle from 'features/shared/components/styledComponents/PageTitle';
import Card from 'features/shared/components/styledComponents/Card';
import { AmenityType } from 'features/amenities/Types';
import placeholderImg from 'assets/images/placeholder.svg';
import { transformCloudinaryImage } from 'lib/utils';

export default function MyAmenities() {
	const { loading, data: amenities } = useApiCall({
		apiUrl: 'amenities',
		initDataValue: [],
	});

	return (
		<>
			<PageTitle>My Amenities</PageTitle>
			<div className="max-w-screen-lg mx-auto mt-12">
				{loading ? (
					<Row
						gutter={[
							{ xs: 0, sm: 20 },
							{ xs: 20, sm: 20 },
						]}
						justify="center"
					>
						{[...Array(6)].map((e, i) => (
							/* eslint-disable react/no-array-index-key */
							<Col
								key={i}
								xs={22}
								sm={11}
								lg={8}
								className="w-full"
							>
								<Card>
									<Skeleton loading={loading} active avatar>
										<div>nhsn</div>
									</Skeleton>
								</Card>
							</Col>
						))}
					</Row>
				) : (
					<Row
						gutter={[
							{ xs: 0, sm: 20 },
							{ xs: 20, sm: 20 },
						]}
						justify="center"
					>
						{amenities.map((amenity: AmenityType) => (
							<Col
								xs={22}
								sm={11}
								lg={8}
								key={amenity._id}
								className="w-full"
							>
								<Card>
									<Image
										width={40}
										height={40}
										preview={false}
										src={
											transformCloudinaryImage(
												amenity.icon,
												'WIDTH_50'
											) || placeholderImg
										}
										fallback={placeholderImg}
									/>
									<div className="pl-6">
										<h3 className="text-3xl mb-3">
											{amenity.name}
										</h3>
										<p>{amenity.description}</p>
									</div>
								</Card>
							</Col>
						))}
					</Row>
				)}
			</div>
		</>
	);
}
