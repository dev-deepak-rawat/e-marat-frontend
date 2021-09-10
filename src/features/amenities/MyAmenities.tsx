import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row } from 'antd';
import { useApiCall } from 'config/hooks';
import PageTitle from 'features/shared/components/styledComponents/PageTitle';
import Choice from 'features/shared/Choice';
import { AmenityType } from 'features/amenities/Types';
import AmenitySkeleton from 'features/amenities/AmenitySkeleton';
import MyAmenityView from 'features/amenities/MyAmenityView';

export default function MyAmenities() {
	const [choice, setChoice] = useState(0);
	const history = useHistory();

	const { loading: loadingAmenities, data: amenities } = useApiCall({
		apiUrl: 'amenities',
		initDataValue: [],
	});

	const { loading: loadingUserAmenities, data: userAmenities } = useApiCall({
		apiUrl: 'currentUserAmenities',
		initDataValue: [],
	});

	const addAmenity = (id: string, name: string) => {
		history.push(`/complaints?id=${id}&name=${name}`);
	};

	const loading = loadingAmenities || loadingUserAmenities;

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
					{loading ? (
						<AmenitySkeleton />
					) : (
						<>
							{amenities
								.filter(
									(amenity: AmenityType) =>
										choice ||
										userAmenities.includes(amenity._id)
								)
								.map((amenity: AmenityType) => (
									<MyAmenityView
										key={amenity._id}
										{...{
											amenity,
											addAmenity,
											userAmenities,
											choice,
										}}
									/>
								))}
						</>
					)}
				</Row>
			</div>
		</>
	);
}
