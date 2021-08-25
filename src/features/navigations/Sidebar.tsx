import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { menuData } from 'features/navigations/menuData';
import MenuItem from 'features/navigations/MenuItem';
import { useAuth, useOrientation } from 'app/hooks';
import { getDefaultSelectedKeys } from 'features/navigations/menuHelper';
import styled from 'styled-components';
import tw from 'twin.macro';

const { Sider } = Layout;
const { SubMenu } = Menu;

const Logo = styled.div`
	${tw`
        h-16
        bg-gray-300
        text-center
        text-2xl
        pt-3
        font-bold
        text-emarat-secondary-default
    `}
`;

export default function Sidebar() {
	const { isMobile } = useOrientation();
	const [collapsed, onCollapse] = useState(isMobile);
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
			zeroWidthTriggerStyle={{
				top: 0,
				height: '3rem',
				right: '-50px',
				width: 50,
			}}
		>
			{/* <div className="logo">xx-Logo Here-xx</div> */}
			{!isMobile && <Logo>{collapsed ? 'E' : 'E-marat'}</Logo>}
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
