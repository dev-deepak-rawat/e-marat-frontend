import { Typography, Space, Dropdown, Menu } from 'antd';
import { FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { signOut } from 'lib/firebaseAuth';
import { useAuth } from 'config/hooks';
import AvatarImage from '../components/image/AvatarImage';

const { Text } = Typography;

const getMenu = (isAdmin: boolean) => (
	<Menu>
		<Menu.Item key="profile">
			<Link to="/profile">My Profile</Link>
		</Menu.Item>
		{!isAdmin && (
			<Menu.Item key="amenities">
				<Link to="/amenities">My Amenities</Link>
			</Menu.Item>
		)}
		<Menu.Item key="signout">
			<button type="button" onClick={() => signOut()}>
				Signout
			</button>
		</Menu.Item>
	</Menu>
);

export default function Topbar() {
	const { userInfo, isAdmin } = useAuth();
	const { claims = {} } = userInfo || {};
	const { firstName = '', picture } = claims;

	return (
		<>
			<Dropdown
				overlay={getMenu(isAdmin)}
				className="absolute top-1.5 right-2 sm:top-2.5 sm:right-4"
			>
				<Space>
					<AvatarImage userImg={`${picture}`} />
					<Text>{firstName || 'User'}</Text>
					<FaChevronDown />
				</Space>
			</Dropdown>
		</>
	);
}
