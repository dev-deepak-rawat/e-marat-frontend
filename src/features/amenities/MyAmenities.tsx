import { useState } from 'react';
import { Skeleton, Row, Col, Image } from 'antd';
import { useApiCall } from 'config/hooks';
import PageTitle from 'features/shared/components/styledComponents/PageTitle';
import Choice from 'features/shared/Choice';
import Card from 'features/shared/components/styledComponents/Card';
import { AmenityType } from 'features/amenities/Types';
import placeholderImg from 'assets/images/placeholder.svg';
import { transformCloudinaryImage } from 'lib/utils';

export default function MyAmenities() {
	const [choice, setChoice] = useState(0);

	const { loading: loadingAmenities, data: amenities } = useApiCall({
		apiUrl: 'amenities',
		initDataValue: [],
	});

	const { loading: loadingUserAmenities, data: userAmenities } = useApiCall({
		apiUrl: 'userAmenities',
		initDataValue: [],
	});

	return (
		<>
			<PageTitle className="bg-transparent">
				<Choice
					{...{
						choice,
						setChoice,
						labels: ['My Amenities', 'All Amenities'],
					}}
				/>
			</PageTitle>
			<div className="max-w-screen-lg mx-auto mt-12">
				<Row
					gutter={[
						{ xs: 0, sm: 20 },
						{ xs: 20, sm: 20 },
					]}
					justify="center"
				>
					{loadingAmenities || loadingUserAmenities ? (
						<>
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
										<Skeleton active avatar />
									</Card>
								</Col>
							))}
						</>
					) : (
						<>
							{amenities
								.filter(
									(amenity: AmenityType) =>
										choice ||
										userAmenities.includes(amenity._id)
								)
								.map((amenity: AmenityType) => (
									<Col
										xs={22}
										sm={11}
										lg={8}
										key={amenity._id}
										className="w-full"
									>
										<Card className="flex items-center">
											<Image
												width={40}
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
												<h4 className="text-2xl font-semibold">
													₹ {amenity.fee}
												</h4>
											</div>
										</Card>
									</Col>
								))}
						</>
					)}
				</Row>
			</div>
		</>
	);
}
