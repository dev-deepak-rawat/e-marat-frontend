import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { menuData } from 'features/navigations/menuData';
import MenuItem from 'features/navigations/MenuItem';
import { useAuth, useOrientation } from 'app/hooks';
import { getDefaultSelectedKeys } from 'features/navigations/menuHelper';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function Sidebar() {
	const [collapsed, onCollapse] = useState(false);
	const { isMobile } = useOrientation();
	const { filterByRole } = useAuth();
	const filteredMenuData = menuData.filter(filterByRole);
	const { defaultOpenKeys, defaultSelectedKeys } =
		getDefaultSelectedKeys(filteredMenuData);

	return (
		<Sider
			collapsible
			collapsed={collapsed}
			onCollapse={onCollapse}
			collapsedWidth={isMobile ? 0 : 80}
			theme="dark"
		>
			<div className="logo">xx-Logo Here-xx</div>
			<Menu
				theme="dark"
				defaultSelectedKeys={defaultSelectedKeys}
				mode="inline"
				defaultOpenKeys={defaultOpenKeys}
			>
				{filteredMenuData.map((menu) => {
					const {
						link,
						label,
						options = [],
						role = '',
						icon: Icon,
						id,
					} = menu;
					if (options.length) {
						return (
							<SubMenu
								key={id}
								icon={Icon ? <Icon /> : null}
								title={label}
							>
								{options.map(MenuItem)}
							</SubMenu>
						);
					}
					return MenuItem({
						link: link || '',
						id,
						label,
						icon: Icon,
						role,
					});
				})}
			</Menu>
		</Sider>
	);
}
