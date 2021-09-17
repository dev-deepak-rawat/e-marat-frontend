import { useState, useEffect } from 'react';
import { Button, Table, Space, Image } from 'antd';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import dayjs from 'dayjs';
import ContainerCard from 'features/shared/components/styledComponents/ContainerCard';
import { apiRequest } from 'config/apiRequest';
import {
	sortStringByProperty,
	sortNumberByProperty,
	sortDateByProperty,
	transformCloudinaryImage,
} from 'lib/utils';
import { AmenityType } from 'features/amenities/Types';
import deleteItem from 'features/shared/components/table/delete';
import searchColumnProps from 'features/shared/components/table/search';
import AmenitiesInput from 'features/amenities/AmenitiesInput';
import placeholderImg from 'assets/images/placeholder.svg';
import PageTitle from 'features/shared/components/styledComponents/PageTitle';
import { DATE_TIME_FORMAT } from 'lib/constants';
import AmenityTypeTag from './AmenityTypeTag';

export default function ManageAmenities() {
	const [amenities, setAmenities] = useState<AmenityType[]>([]);
	const [currentAmenity, setCurrentAmenity] = useState<AmenityType | null>(
		null
	);
	const [loading, setLoading] = useState<boolean>(true);
	const [amenitiesInputVisible, setAmenitiesInputVisible] =
		useState<boolean>(false);

	useEffect(() => {
		loadAmenities();
	}, []);

	const loadAmenities = async () => {
		const response = await apiRequest({
			apiUrl: 'amenities',
		});

		if (Array.isArray(response.data)) {
			setAmenities(response.data);
		}
		setLoading(false);
	};

	const editAmenity = (amenity: AmenityType | null) => {
		setCurrentAmenity(amenity);
		setAmenitiesInputVisible(true);
	};

	const getColumnSearchProps = (dataIndex: string) =>
		searchColumnProps<AmenityType>(dataIndex);

	return (
		<>
			<PageTitle>Manage Amenities</PageTitle>
			<ContainerCard size="xl">
				<div className="text-right ">
					<Button type="primary" onClick={() => editAmenity(null)}>
						Create
					</Button>
				</div>

				<Table<AmenityType>
					dataSource={amenities}
					rowKey="_id"
					loading={loading}
					scroll={{ x: true }}
				>
					<Table.Column<AmenityType>
						title=""
						dataIndex="type"
						sorter={sortStringByProperty<AmenityType>('type')}
						{...getColumnSearchProps('type')}
						render={(type) => <AmenityTypeTag type={type} />}
					/>
					<Table.Column<AmenityType>
						title="Name"
						dataIndex="name"
						sorter={sortStringByProperty<AmenityType>('name')}
						{...getColumnSearchProps('name')}
					/>
					<Table.Column<AmenityType>
						title="Description"
						dataIndex="description"
						ellipsis={true}
						sorter={sortStringByProperty<AmenityType>(
							'description'
						)}
						{...getColumnSearchProps('description')}
					/>
					<Table.Column<AmenityType>
						title="Fee"
						dataIndex="fee"
						sorter={sortNumberByProperty<AmenityType>('fee')}
						{...getColumnSearchProps('fee')}
					/>
					<Table.Column<AmenityType>
						title="Icon"
						dataIndex="icon"
						sorter={false}
						render={(icon) => (
							<Image
								width={40}
								height={40}
								preview={false}
								src={
									transformCloudinaryImage(
										icon,
										'WIDTH_50'
									) || placeholderImg
								}
								fallback={placeholderImg}
								alt="amenity"
							/>
						)}
					/>
					<Table.Column<AmenityType>
						title="Created At"
						dataIndex="createdAt"
						sorter={sortDateByProperty<AmenityType>('createdAt')}
						render={(createdAt) =>
							dayjs(createdAt).format(DATE_TIME_FORMAT)
						}
					/>
					<Table.Column<AmenityType>
						title="Actions"
						render={(value, amenity) => (
							<>
								<Space>
									<Button
										type="primary"
										shape="circle"
										className="btn-warning"
										icon={<AiFillEdit />}
										onClick={() => editAmenity(amenity)}
									/>

									<Button
										type="primary"
										shape="circle"
										icon={<AiFillDelete />}
										onClick={() =>
											amenity._id &&
											deleteItem<AmenityType[]>(
												'delAmenity',
												amenity._id,
												amenities,
												setAmenities
											)
										}
										danger
									/>
								</Space>
							</>
						)}
					/>
				</Table>
			</ContainerCard>
			{amenitiesInputVisible && (
				<AmenitiesInput
					isVisible={amenitiesInputVisible}
					setIsVisible={setAmenitiesInputVisible}
					edit={currentAmenity}
					submitCallback={loadAmenities}
				/>
			)}
		</>
	);
}
