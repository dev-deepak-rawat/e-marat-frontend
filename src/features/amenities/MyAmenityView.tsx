import { Card, Col, Image, Space, Button } from 'antd';
import { transformCloudinaryImage } from 'lib/utils';
import { AmenityType } from 'features/amenities/Types';
import placeholderImg from 'assets/images/placeholder.svg';
import { AMENITY_TYPES } from 'lib/constants';
import AmenityTypeTag from './AmenityTypeTag';

type MyAmenityViewProps = {
	userAmenities: string[];
	amenity: AmenityType;
	choice: number;
	addAmenity: (id: string, name: string) => void;
};

export default function MyAmenityView(props: MyAmenityViewProps) {
	const { amenity, userAmenities, choice, addAmenity } = props;
	const { name, _id: amenityId, icon, description, fee, type } = amenity;
	const showAddButton =
		userAmenities.includes(amenityId) &&
		Boolean(choice) &&
		type !== AMENITY_TYPES.BASIC;
	return (
		<Col xs={22} sm={11} lg={8} key={amenityId} className="w-full">
			<Card>
				<div className="flex items-center">
					<Image
						width={50}
						preview={false}
						src={
							transformCloudinaryImage(icon, 'WIDTH_50') ||
							placeholderImg
						}
						fallback={placeholderImg}
						alt="amenity"
					/>
					<div className="pl-6">
						<Space size="large" className="items-start">
							<h3 className="text-3xl mb-3">{name}</h3>
							<AmenityTypeTag type={type} />
						</Space>
						<p>{description}</p>
						<Space className="mt-4" size="middle">
							<h4 className="text-2xl font-semibold">₹ {fee}</h4>
							{showAddButton && (
								<Button
									type="primary"
									onClick={() => addAmenity(amenityId, name)}
								>
									Add
								</Button>
							)}
						</Space>
					</div>
				</div>
			</Card>
		</Col>
	);
}
