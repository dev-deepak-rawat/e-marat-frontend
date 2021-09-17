import { Card, Col, Image, Button } from 'antd';
import { AiOutlinePlus } from 'react-icons/ai';
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
		!userAmenities.includes(amenityId) &&
		Boolean(choice) &&
		type !== AMENITY_TYPES.BASIC;
	return (
		<Col xs={22} sm={11} lg={8} key={amenityId} className="w-full">
			<Card className="rounded-lg shadow-sm" style={{ minHeight: 200 }}>
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
					<div className="w-full pl-6">
						<div className="flex justify-between items-center mb-3">
							<h3 className="text-3xl">{name}</h3>
							<AmenityTypeTag type={type} className="h-fit" />
						</div>
						<p>{description}</p>
						<div className="flex justify-between items-center mt-4">
							<h4 className="text-2xl font-semibold">₹ {fee}</h4>
							{showAddButton && (
								<Button
									className="text-white bg-green-500 hover:text-green-500 hover:border-green-500"
									type="ghost"
									onClick={() => addAmenity(amenityId, name)}
									shape="circle"
									icon={<AiOutlinePlus />}
									data-testid="addButton"
								/>
							)}
						</div>
					</div>
				</div>
			</Card>
		</Col>
	);
}
