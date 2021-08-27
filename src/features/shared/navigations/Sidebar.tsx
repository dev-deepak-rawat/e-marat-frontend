import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { menuData } from 'features/shared/navigations/menuData';
import MenuItem from 'features/shared/navigations/MenuItem';
import { useAuth, useOrientation } from 'config/hooks';
import { getDefaultSelectedKeys } from 'features/shared/navigations/menuHelper';
import styled from 'styled-components';
import tw from 'twin.macro';

const { Sider } = Layout;

const Logo = styled.div`
	${tw`
        h-16
        bg-gray-300
        text-center
        text-2xl
        pt-3
        font-bold
        text-emarat-secondary-default
        cursor-pointer
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
            {!isMobile && (
                <Logo onClick={() => onCollapse(!collapsed)}>
                    {collapsed ? 'E' : 'E-marat'}
                </Logo>
            )}
            <Menu
                theme="dark"
                defaultSelectedKeys={defaultSelectedKeys}
                mode="inline"
                defaultOpenKeys={defaultOpenKeys}
            >
                {filteredMenuData.map(MenuItem)}
            </Menu>
        </Sider>
    );
}
