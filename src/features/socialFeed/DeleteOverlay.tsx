import { Button, Dropdown, Menu } from 'antd';
import { HiOutlineDotsVertical } from 'react-icons/hi';

type DeleteOverlayType = {
	itemKey: string;
	handleClick: (itemKey: string) => Promise<void>;
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
			className="absolute right-2 mt-6"
		>
			<HiOutlineDotsVertical />
		</Dropdown>
	);
}
