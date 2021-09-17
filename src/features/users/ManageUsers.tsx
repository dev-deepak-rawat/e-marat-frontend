import { useState, useEffect } from 'react';
import { Button, Table, Space } from 'antd';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import dayjs from 'dayjs';
import ContainerCard from 'features/shared/components/styledComponents/ContainerCard';
import { apiRequest } from 'config/apiRequest';
import { sortStringByProperty, sortDateByProperty } from 'lib/utils';
import { FaUser, FaUserCog } from 'react-icons/fa';
import { UserType } from 'features/users/Types';
import searchColumnProps from 'features/shared/components/table/search';
import deleteItem from 'features/shared/components/table/delete';
import UserInput from 'features/users/UserInput';
import PageTitle from 'features/shared/components/styledComponents/PageTitle';
import { DATE_FORMAT } from 'lib/constants';
import AvatarImage from 'features/shared/components/image/AvatarImage';

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
			<PageTitle>Manage Users</PageTitle>
			<ContainerCard size="xl">
				<div className="text-right">
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
						render={(value, user) =>
							value ? (
								<FaUserCog className="text-2xl text-green-500" />
							) : (
								<FaUser className="text-xl text-indigo-500" />
							)
						}
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
						render={(picture) => <AvatarImage userImg={picture} />}
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
							dayjs(createdAt).format(DATE_FORMAT)
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
										icon={<AiFillEdit />}
										onClick={() => editUser(user)}
									/>

									<Button
										type="primary"
										shape="circle"
										icon={<AiFillDelete />}
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
