import { useState, useEffect } from 'react';
import { Button, Modal, Table, Space, Image } from 'antd';
import {
	EditFilled,
	DeleteFilled,
	ExclamationCircleOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import ContainerCard from 'features/shared/components/styledComponents/ContainerCard';
import ContainerCardTitle from 'features/shared/components/styledComponents/ContainerCardTitle';
import { apiRequest } from 'config/apiRequest';
import {
	sortStringByProperty,
	sortNumberByProperty,
	sortDateByProperty,
} from 'lib/utils';
import { ApiResponse } from 'lib/types';
import { AmenityType } from 'features/amenities/Types';
import deleteItem from 'features/shared/components/table/delete';
import searchColumnProps from 'features/shared/components/table/search';
import AmenitiesInput from 'features/amenities/AmenitiesInput';
import placeholderImg from 'assets/images/placeholder.svg';

export default function ManageAmenities() {
	const [amenities, setAmenities] = useState<AmenityType[]>([]);
	const [currentAmenity, setCurrentAmenity] = useState<AmenityType>();
	const [loading, setLoading] = useState<boolean>(true);
	useState<boolean>(false);
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

	const editAmenity = (amenity: AmenityType) => {
		setCurrentAmenity(amenity);
		setAmenitiesInputVisible(true);
	};

	const getColumnSearchProps = (dataIndex: string) =>
		searchColumnProps<AmenityType>(dataIndex);

	return (
		<>
			<ContainerCard>
				<ContainerCardTitle>Manage Amenities</ContainerCardTitle>

				<div className="text-right mb-4 -mt-6">
					<Button
						type="primary"
						onClick={() => setAmenitiesInputVisible(true)}
					>
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
								className="rounded-full"
								width={40}
								height={40}
								preview={false}
								src={icon || placeholderImg}
								fallback={placeholderImg}
							/>
						)}
					/>
					<Table.Column<AmenityType>
						title="Created At"
						dataIndex="createdAt"
						sorter={sortDateByProperty<AmenityType>('createdAt')}
						render={(createdAt) =>
							dayjs(createdAt).format('DD MMM h:mm:ss A')
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
										icon={<EditFilled />}
										onClick={() => editAmenity(amenity)}
									/>

									<Button
										type="primary"
										shape="circle"
										icon={<DeleteFilled />}
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

			<AmenitiesInput
				isVisible={amenitiesInputVisible}
				setIsVisible={setAmenitiesInputVisible}
				edit={currentAmenity}
				submitCallback={loadAmenities}
			/>
		</>
	);
}
