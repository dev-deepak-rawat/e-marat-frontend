import { useState, useEffect } from 'react';
import { Button, Modal, Table, Space } from 'antd';
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
import { apiResponse } from 'lib/types';
import { AmenityType } from 'features/amenities/Types';

export default function ManageAmenities() {
	const [amenities, setAmenities] = useState<AmenityType[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		(async () => {
			const response = await apiRequest({
				apiUrl: 'amenities',
			});

			if (Array.isArray(response.data)) {
				setAmenities(response.data);
			}
			setLoading(false);
		})();
	}, []);

	const editAmenity = (id: string) => {
		console.log(id);
	};

	const deleteAmenity = (id: string) => {
		Modal.confirm({
			title: 'Are you sure?',
			icon: <ExclamationCircleOutlined />,
			content: 'This action is not recoverable',
			async onOk() {
				try {
					const response: apiResponse = await apiRequest({
						apiUrl: 'amenitiesDel',
						appendToUrl: id,
					});

					if (response.meta.success) {
						console.log('SAd');

						setAmenities(
							amenities.filter((amenity) => amenity._id != id)
						);
					}
					// else {
					// }
				} catch (e) {
					console.log('errors!');
				}
			},
		});
	};

	return (
		<ContainerCard>
			<ContainerCardTitle>Manage Amenities</ContainerCardTitle>

			<Table<AmenityType>
				dataSource={amenities}
				rowKey="_id"
				loading={loading}
			>
				<Table.Column<AmenityType>
					title="Name"
					dataIndex="name"
					sorter={sortStringByProperty<AmenityType>('name')}
				/>
				<Table.Column<AmenityType>
					title="Description"
					dataIndex="description"
					sorter={sortStringByProperty<AmenityType>('description')}
				/>
				<Table.Column<AmenityType>
					title="Fee"
					dataIndex="fee"
					sorter={sortNumberByProperty<AmenityType>('fee')}
				/>
				<Table.Column<AmenityType>
					title="Icon"
					dataIndex="icon"
					sorter={false}
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
									icon={<EditFilled />}
								/>

								<Button
									type="primary"
									shape="circle"
									icon={<DeleteFilled />}
									danger
									onClick={() =>
										amenity._id &&
										deleteAmenity(amenity._id)
									}
								/>
							</Space>
						</>
					)}
				/>
			</Table>
		</ContainerCard>
	);
}
