import styled from 'styled-components';
import { Avatar, Typography, Space, Dropdown, Menu } from 'antd';
import { AiOutlineUser } from 'react-icons/ai';
import { FaChevronDown } from 'react-icons/fa';
import tw from 'twin.macro';
import { menuData } from 'features/shared/navigations/menuData';
import { getPageTitle } from 'features/shared/navigations/menuHelper';
import { signOut } from 'lib/firebaseAuth';
import { Link, useLocation } from 'react-router-dom';
import { useAuth, useTopbar } from 'config/hooks';
import { useEffect } from 'react';
import { transformCloudinaryImage } from 'lib/utils';

const { Text } = Typography;

const Title = styled.p`
	${tw`
        text-2xl
        pl-16
        pt-2
        font-medium
        sm:pl-12
    `}
`;

const menu = (
	<Menu>
		<Menu.Item>
			<Link to="/profile">My Profile</Link>
		</Menu.Item>
		<Menu.Item>
			<button type="button" onClick={() => signOut()}>
				Signout
			</button>
		</Menu.Item>
	</Menu>
);

export default function Topbar() {
	const { userInfo } = useAuth();
	const location = useLocation();
	const { title, setUrlTitle } = useTopbar();
	const urlPathName = location.pathname;
	const { claims = {} } = userInfo || {};
	const { firstName = '', lastName = '', picture } = claims;
	const intialTitle = getPageTitle(menuData, urlPathName);

	useEffect(() => {
		setUrlTitle(intialTitle);
		return () => {
			setUrlTitle('');
		};
	}, [urlPathName]);
	return (
		// <div className="flex justify-between">
		// <Title>{title}</Title>
		<Dropdown overlay={menu} className="absolute top-4 right-6">
			<Space>
				<Avatar
					size={45}
					className={picture ? '' : 'p-2'}
					icon={<AiOutlineUser size="30px" />}
					shape="circle"
					src={transformCloudinaryImage(`${picture}`, 'AVATAR')}
				/>
				<Text>{firstName ? `${firstName} ${lastName}` : 'User'}</Text>
				<FaChevronDown />
			</Space>
		</Dropdown>
		// </div>
	);
}
