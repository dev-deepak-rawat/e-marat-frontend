import { Button, Dropdown, Menu } from 'antd';
import { HiOutlineDotsVertical } from 'react-icons/hi';

type DeleteOverlayType = {
	itemKey: string;
	handleClick: (itemKey: string) => unknown;
};

export default function DeleteOverlay({
	itemKey,
	handleClick,
}: DeleteOverlayType) {
	const onClick = async () => {
		await handleClick(itemKey);
	};
	return (
		<Dropdown
			trigger={['click']}
			overlay={
				<Menu>
					<Menu.Item key="delete">
						<Button
							className="text-red-500"
							type="link"
							onClick={onClick}
						>
							Delete
						</Button>
					</Menu.Item>
				</Menu>
			}
			placement="bottomRight"
		>
			<div className="cursor-pointer h-fit">
				<HiOutlineDotsVertical className="text-gray-400 text-2xl" />
			</div>
		</Dropdown>
	);
}
