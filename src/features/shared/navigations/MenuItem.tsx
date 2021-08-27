import { Menu } from 'antd';
import type { IconType } from 'react-icons/lib/cjs/iconBase';
import { Link } from 'react-router-dom';

type MenuItemProps = {
	link: string;
	label: string;
    icon?: IconType;
	id: string;
};

MenuItem.defaultProps = {
    icon: undefined,
};

export default function MenuItem({
	label,
	link,
	icon: Icon,
    id,
}: MenuItemProps) {
	return (
		<Menu.Item key={id} icon={Icon ? <Icon /> : null}>
			<Link to={link}>{label}</Link>
		</Menu.Item>
	);
}
