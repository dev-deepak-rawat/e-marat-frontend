import { Menu } from 'antd';
import type { IconType } from 'react-icons/lib/cjs/iconBase';
import { Link } from 'react-router-dom';

type MenuItemProps = {
	link: string;
	label: string;
	icon?: IconType;
	role?: string;
	id: string;
};

MenuItem.defaultProps = {
	icon: undefined,
	role: '',
};

export default function MenuItem({
	label,
	link,
	icon: Icon,
	id,
	role,
}: MenuItemProps) {
	return (
		<Menu.Item key={id} icon={Icon ? <Icon /> : null}>
			<Link to={link}>{label}</Link>
		</Menu.Item>
	);
}
