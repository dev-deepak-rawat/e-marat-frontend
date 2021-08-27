import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

export default function ManageUser() {
	interface User {
		key: number;
		name: string;
	}

	const columns: ColumnsType<User> = [
		{
			key: 'name',
			title: 'Name',
			dataIndex: 'name',
		},
	];

	const data: User[] = [
		{
			key: 0,
			name: 'Jack',
		},
	];

	return (
		<div>
			<Table<User> dataSource={data} columns={columns} />
		</div>
	);
}
