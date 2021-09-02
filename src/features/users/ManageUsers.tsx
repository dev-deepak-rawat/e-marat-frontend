import { useState, useEffect } from 'react';
import { Button, Image, Table, Space } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import dayjs from 'dayjs';
import ContainerCard from 'features/shared/components/styledComponents/ContainerCard';
import ContainerCardTitle from 'features/shared/components/styledComponents/ContainerCardTitle';
import { apiRequest } from 'config/apiRequest';
import { sortStringByProperty, sortDateByProperty } from 'lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { UserType } from 'features/users/Types';
import searchColumnProps from 'features/shared/components/table/search';
import deleteItem from 'features/shared/components/table/delete';
import UserInput from 'features/users/UserInput';
import userPlaceholderImg from 'assets/images/user-placeholder.svg';

export default function ManageUsers() {
	const [users, setUsers] = useState<UserType[]>([]);
	const [currentUser, setCurrentUser] = useState<UserType | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	useState<boolean>(false);
	const [userInputVisible, setUserInputVisible] = useState<boolean>(false);

	useEffect(() => {
		loadUsers();
	}, []);

	const loadUsers = async () => {
		const response = await apiRequest({
			apiUrl: 'users',
		});
		const { data } = response;
		if (Array.isArray(data)) {
			setUsers(data);
		}
		setLoading(false);
	};

	const editUser = (user: UserType | null) => {
		setCurrentUser(user);
		setUserInputVisible(true);
	};

	const getColumnSearchProps = (dataIndex: string) =>
		searchColumnProps<UserType>(dataIndex);

	return (
		<>
			<ContainerCard>
				<ContainerCardTitle>Manage Users</ContainerCardTitle>

				<div className="text-right mb-4 -mt-6">
					<Button type="primary" onClick={() => editUser(null)}>
						Create
					</Button>
				</div>

				<Table<UserType>
					dataSource={users}
					rowKey="_id"
					loading={loading}
					scroll={{ x: true }}
				>
					<Table.Column<UserType>
						title=""
						dataIndex="isAdmin"
						render={(value, user) => (
							<FontAwesomeIcon
								icon={value ? faUserCog : faUser}
								className={`text-xl ${
									value ? 'text-green-500' : 'text-indigo-500'
								}`}
							/>
						)}
					/>
					<Table.Column<UserType>
						title="First Name"
						dataIndex="firstName"
						sorter={sortStringByProperty<UserType>('firstName')}
						{...getColumnSearchProps('firstName')}
					/>
					<Table.Column<UserType>
						title="Last Name"
						dataIndex="lastName"
						sorter={sortStringByProperty<UserType>('lastName')}
						{...getColumnSearchProps('lastName')}
					/>

					<Table.Column<UserType>
						title="Phone"
						dataIndex="phone"
						sorter={sortStringByProperty<UserType>('phone')}
						{...getColumnSearchProps('phone')}
					/>
					<Table.Column<UserType>
						title="Picture"
						dataIndex="picture"
						sorter={false}
						render={(picture) => (
							<Image
								width={40}
								height={40}
								preview={false}
								src={picture || userPlaceholderImg}
								fallback={userPlaceholderImg}
							/>
						)}
					/>
					<Table.Column<UserType>
						title="Flat"
						dataIndex="flat"
						sorter={sortStringByProperty<UserType>('flat')}
						{...getColumnSearchProps('flat')}
					/>
					<Table.Column<UserType>
						title="Created At"
						dataIndex="createdAt"
						sorter={sortDateByProperty<UserType>('createdAt')}
						render={(createdAt) =>
							dayjs(createdAt).format('DD MMM h:mm:ss A')
						}
					/>
					<Table.Column<UserType>
						title="Actions"
						render={(value, user) => (
							<>
								<Space>
									<Button
										type="primary"
										shape="circle"
										className="btn-warning"
										icon={<EditFilled />}
										onClick={() => editUser(user)}
									/>

									<Button
										type="primary"
										shape="circle"
										icon={<DeleteFilled />}
										onClick={() =>
											user._id &&
											deleteItem<UserType[]>(
												'delUser',
												user._id,
												users,
												setUsers
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

			{userInputVisible && (
				<UserInput
					isVisible={userInputVisible}
					setIsVisible={setUserInputVisible}
					edit={currentUser}
					submitCallback={loadUsers}
				/>
			)}
		</>
	);
}
