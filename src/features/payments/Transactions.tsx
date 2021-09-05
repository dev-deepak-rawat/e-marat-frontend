import { Image, Table } from 'antd';
import dayjs from 'dayjs';
import ContainerCard from 'features/shared/components/styledComponents/ContainerCard';
import {
	sortDateByProperty,
	sortNumberByProperty,
	sortStringByProperty,
	transformCloudinaryImage,
} from 'lib/utils';
import userPlaceholderImg from 'assets/images/user-placeholder.svg';
import type { TransactionType } from 'features/payments/paymentsTypes';
import { useApiCall } from 'config/hooks';
import searchColumnProps from 'features/shared/components/table/search';
import { DATE_FORMAT, STATUS_COLOR_MAPPER } from 'lib/constants';
import PageTitle from 'features/shared/components/styledComponents/PageTitle';

type TransactionsProps = {
	showTitle?: boolean;
};

export default function Transactions({ showTitle = true }: TransactionsProps) {
	const { data, loading } = useApiCall({
		apiUrl: 'transactions',
		initDataValue: [],
	});

	const getColumnSearchProps = (dataIndex: string) =>
		searchColumnProps<TransactionType>(dataIndex);

	return (
		<>
			{showTitle && <PageTitle>Transactions</PageTitle>}
			<ContainerCard size="xl">
				<Table<TransactionType>
					dataSource={data}
					rowKey="_id"
					loading={loading}
					scroll={{ x: true }}
				>
					<Table.Column<TransactionType>
						title=""
						dataIndex="picture"
						sorter={false}
						render={(picture) => (
							<Image
								className="rounded-full"
								width={40}
								height={40}
								preview={false}
								src={
									transformCloudinaryImage(
										`${picture}`,
										'AVATAR'
									) || userPlaceholderImg
								}
								fallback={userPlaceholderImg}
							/>
						)}
					/>

					<Table.Column<TransactionType>
						title="Name"
						dataIndex="name"
						sorter={sortStringByProperty<TransactionType>('name')}
						{...getColumnSearchProps('name')}
					/>

					<Table.Column<TransactionType>
						title="Order Id"
						dataIndex="orderId"
						sorter={sortStringByProperty<TransactionType>(
							'orderId'
						)}
						{...getColumnSearchProps('orderId')}
					/>

					<Table.Column<TransactionType>
						title="Amount"
						dataIndex="amount"
						sorter={sortNumberByProperty<TransactionType>('amount')}
						{...getColumnSearchProps('amount')}
					/>

					<Table.Column<TransactionType>
						title="Status"
						dataIndex="status"
						sorter={sortStringByProperty<TransactionType>('status')}
						{...getColumnSearchProps('status')}
						render={(value) => (
							<span
								className={`capitalize font-semibold ${
									STATUS_COLOR_MAPPER[
										value as
											| 'success'
											| 'pending'
											| 'failed'
									]
								}`}
							>
								{value}
							</span>
						)}
					/>

					<Table.Column<TransactionType>
						title="Phone"
						dataIndex="phone"
						sorter={sortStringByProperty<TransactionType>('phone')}
						{...getColumnSearchProps('phone')}
					/>

					<Table.Column<TransactionType>
						title="Payment Id"
						dataIndex="paymentId"
						sorter={sortStringByProperty<TransactionType>(
							'paymentId'
						)}
						{...getColumnSearchProps('paymentId')}
					/>

					<Table.Column<TransactionType>
						title="Month"
						dataIndex="month"
						sorter={sortStringByProperty<TransactionType>('month')}
						{...getColumnSearchProps('month')}
					/>
					<Table.Column<TransactionType>
						title="Processed At"
						dataIndex="processedAt"
						sorter={sortDateByProperty<TransactionType>(
							'processedAt'
						)}
						render={(processedAt) =>
							dayjs(processedAt).format(DATE_FORMAT)
						}
					/>
				</Table>
			</ContainerCard>
		</>
	);
}
