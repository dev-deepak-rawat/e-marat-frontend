import { useState, useEffect } from 'react';
import { Button, Table, Space, Image, Popover } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import dayjs from 'dayjs';
import ContainerCard from 'features/shared/components/styledComponents/ContainerCard';
import { apiRequest } from 'config/apiRequest';
import { sortStringByProperty, sortDateByProperty } from 'lib/utils';
import { ComplaintType } from 'features/complaints/Types';
import deleteItem from 'features/shared/components/table/delete';
import searchColumnProps from 'features/shared/components/table/search';
import ComplaintInput from 'features/complaints/ComplaintInput';
import placeholderImg from 'assets/images/placeholder.svg';
import PageTitle from 'features/shared/components/styledComponents/PageTitle';
import { useAuth } from 'config/hooks';

type ManageComplaintsProps = {
	showTitle?: boolean;
};

export default function ManageComplaints({
	showTitle = true,
}: ManageComplaintsProps) {
	const [complaints, setComplaints] = useState<ComplaintType[]>([]);
	const [currentComplaint, setCurrentComplaint] =
		useState<ComplaintType | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [complaintsInputVisible, setComplaintsInputVisible] =
		useState<boolean>(false);
	const { isAdmin } = useAuth();

	useEffect(() => {
		loadComplaints();
	}, []);

	const loadComplaints = async () => {
		const response = await apiRequest({
			apiUrl: 'complaints',
		});

		if (Array.isArray(response.data)) {
			setComplaints(response.data);
		}
		setLoading(false);
	};

	const editComplaint = (complaint: ComplaintType | null) => {
		setCurrentComplaint(complaint);
		setComplaintsInputVisible(true);
	};

	const getColumnSearchProps = (dataIndex: string) =>
		searchColumnProps<ComplaintType>(dataIndex);

	const statusColors = {
		raised: 'bg-yellow-200 text-yellow-700',
		progress: 'bg-blue-200 text-blue-700',
		resolved: 'bg-green-200 text-green-700',
		rejected: 'bg-red-200 text-red-700',
	};

	return (
		<>
			{showTitle && <PageTitle>Manage Complaints</PageTitle>}
			<ContainerCard>
				<Table<ComplaintType>
					dataSource={complaints}
					rowKey="_id"
					loading={loading}
					scroll={{ x: true }}
				>
					{isAdmin && (
						<Table.Column<ComplaintType>
							title="Raised By"
							dataIndex="userName"
							ellipsis={true}
							sorter={sortStringByProperty<ComplaintType>(
								'userName'
							)}
							{...getColumnSearchProps('userName')}
							render={(name, complaint) => (
								<Popover
									content={
										<div>
											{complaint.userFlat && (
												<p>
													Flat :
													<b> {complaint.userFlat}</b>
												</p>
											)}
											{complaint.userPhone && (
												<p>
													Phone :
													<b>
														{' '}
														{complaint.userPhone}
													</b>
												</p>
											)}
										</div>
									}
								>
									<span className="cursor-pointer">
										{complaint.userName}
									</span>
								</Popover>
							)}
						/>
					)}
					<Table.Column<ComplaintType>
						title="Amenity"
						dataIndex="amenityName"
						sorter={sortStringByProperty<ComplaintType>(
							'amenityName'
						)}
						{...getColumnSearchProps('amenityName')}
						render={(name, complaint) =>
							complaint.amenityName ? (
								<Popover
									content={
										<div>
											<p>
												Name :
												<b> {complaint.amenityName}</b>
											</p>
											<p>
												Fee :
												<b> ₹{complaint.amenityFee}</b>
											</p>
										</div>
									}
								>
									<Image
										className="rounded-full cursor-pointer"
										width={40}
										height={40}
										preview={false}
										src={
											complaint.amenityIcon ||
											placeholderImg
										}
										fallback={placeholderImg}
									/>
								</Popover>
							) : (
								<span />
							)
						}
					/>
					<Table.Column<ComplaintType>
						title="Description"
						dataIndex="description"
						ellipsis={true}
						sorter={sortStringByProperty<ComplaintType>(
							'description'
						)}
						{...getColumnSearchProps('description')}
					/>
					<Table.Column<ComplaintType>
						title={`${isAdmin ? '' : "Admin's"} Comment`}
						dataIndex="comment"
						ellipsis={true}
						sorter={sortStringByProperty<ComplaintType>('comment')}
						{...getColumnSearchProps('comment')}
					/>
					<Table.Column<ComplaintType>
						title="Status"
						dataIndex="status"
						sorter={sortStringByProperty<ComplaintType>('status')}
						{...getColumnSearchProps('status')}
						render={(status: ComplaintType['status']) => (
							<div
								className={`${statusColors[status]} text-center rounded-full px-3 py-1 capitalize`}
							>
								{status}
							</div>
						)}
					/>
					<Table.Column<ComplaintType>
						title="Raised At"
						dataIndex="createdAt"
						sorter={sortDateByProperty<ComplaintType>('createdAt')}
						render={(createdAt) =>
							dayjs(createdAt).format('DD MMM h:mm:ss A')
						}
					/>
					{isAdmin && (
						<Table.Column<ComplaintType>
							title="Actions"
							render={(value, complaint) => (
								<>
									<Space>
										<Button
											type="primary"
											shape="circle"
											className="btn-warning"
											icon={<EditFilled />}
											onClick={() =>
												editComplaint(complaint)
											}
										/>

										<Button
											type="primary"
											shape="circle"
											icon={<DeleteFilled />}
											onClick={() =>
												complaint._id &&
												deleteItem<ComplaintType[]>(
													'delComplaint',
													complaint._id,
													complaints,
													setComplaints
												)
											}
											danger
										/>
									</Space>
								</>
							)}
						/>
					)}
				</Table>
			</ContainerCard>
			{complaintsInputVisible && (
				<ComplaintInput
					isVisible={complaintsInputVisible}
					setIsVisible={setComplaintsInputVisible}
					edit={currentComplaint}
					submitCallback={loadComplaints}
				/>
			)}
		</>
	);
}
