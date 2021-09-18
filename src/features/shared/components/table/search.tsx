import React, { useState } from 'react';
import { ColumnType, FilterConfirmProps } from 'antd/lib/table/interface';
import Highlighter from 'react-highlight-words';
import { AiOutlineSearch } from 'react-icons/ai';
import { Input, Button, Space } from 'antd';

export default function searchColumnProps<T>(dataIndex: string): ColumnType<T> {
	const [searchText, setSearchText] = useState<React.Key>('');
	const [searchedColumn, setSearchedColumn] = useState<string>('');
	let searchInput: Input | null;

	const handleSearch = (
		selectedKeys: React.Key[],
		confirm: (param?: FilterConfirmProps | undefined) => void,
		dataIndex2: keyof T
	) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex2 as string);
	};

	const handleReset = (clearFilters: (() => void) | undefined) => {
		clearFilters && clearFilters();
		setSearchText('');
	};

	return {
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) => (
			<div className="p-4">
				<Input
					className="block mb-3"
					ref={(node) => {
						searchInput = node;
					}}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						handleSearch(
							selectedKeys,
							confirm,
							dataIndex as keyof T
						)
					}
				/>
				<Space size="large">
					<Button
						className="flex items-center w-24"
						type="primary"
						onClick={() =>
							handleSearch(
								selectedKeys,
								confirm,
								dataIndex as keyof T
							)
						}
						icon={<AiOutlineSearch />}
						size="small"
					>
						Search
					</Button>
					<Button
						className="w-24"
						onClick={() => handleReset(clearFilters)}
						size="small"
					>
						Reset
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => (
			<AiOutlineSearch
				style={{ color: filtered ? '#1890ff' : undefined }}
			/>
		),
		onFilter: (value, record) => {
			if (
				Object.prototype.hasOwnProperty.call(record, dataIndex) &&
				typeof value === 'string' &&
				record[dataIndex as keyof T]
			) {
				return String(record[dataIndex as keyof T])
					.toLowerCase()
					.includes(value.toLowerCase());
			}
			return false;
		},
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput?.select(), 100);
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{
						backgroundColor: '#ffc069',
						padding: 0,
					}}
					searchWords={[searchText as string]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			),
	};
}
