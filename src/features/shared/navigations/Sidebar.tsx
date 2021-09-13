import { SetStateAction, Dispatch } from 'react';
import { Layout, Menu, Space } from 'antd';
import styled from 'styled-components';
import tw from 'twin.macro';
import { menuData } from 'features/shared/navigations/menuData';
import MenuItem from 'features/shared/navigations/MenuItem';
import { useAuth } from 'config/hooks';
import { getDefaultSelectedKeys } from 'features/shared/navigations/menuHelper';
import { CLOUDINARY_IMAGES } from 'lib/constants';

const { Sider } = Layout;

const Logo = styled.div`
	${tw`
        h-24
        text-center
        text-2xl
        pt-5
        font-bold
        text-emarat-secondary-default
        cursor-pointer
    `}
	background: #001529;
`;

type SidebarProps = {
	isMobileSize: boolean;
	collapsed: boolean;
	onCollapse: Dispatch<SetStateAction<boolean>>;
};

export default function Sidebar(props: SidebarProps) {
	const { filterByRole } = useAuth();
	const filteredMenuData = menuData.filter(filterByRole);
	const defaultSelectedKeys = getDefaultSelectedKeys(filteredMenuData);

	const { isMobileSize, collapsed, onCollapse } = props;

	return (
		<Sider
			collapsible
			collapsed={collapsed}
			onCollapse={onCollapse}
			collapsedWidth={isMobileSize ? 0 : 80}
			theme="dark"
			zeroWidthTriggerStyle={{
				top: 0,
				height: '2.8rem',
				right: '-40px',
				width: 40,
			}}
			className="min-h-full fixed z-10"
		>
			<Logo onClick={() => onCollapse(!collapsed)}>
				<Space size="small">
					<img
						src={CLOUDINARY_IMAGES.LOGO}
						alt="Logo"
						className="h-12"
					/>
					{collapsed ? '' : '-MARAT'}
				</Space>
			</Logo>
			<Menu theme="dark" selectedKeys={defaultSelectedKeys} mode="inline">
				{filteredMenuData.map(MenuItem)}
			</Menu>
		</Sider>
	);
}
