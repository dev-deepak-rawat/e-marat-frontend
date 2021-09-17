import { Space, Dropdown, Menu } from 'antd';
import { FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { signOut } from 'lib/firebaseAuth';
import { useAuth } from 'config/hooks';
import AvatarImage from '../components/image/AvatarImage';

const getMenu = (isAdmin: boolean) => (
	<Menu>
		<Menu.Item key="profile" className="p-3 border-b text-center">
			<Link to="/profile">My Profile</Link>
		</Menu.Item>
		{!isAdmin && (
			<Menu.Item key="amenities" className="p-3 border-b text-center">
				<Link to="/amenities">My Amenities</Link>
			</Menu.Item>
		)}
		<Menu.Item key="signout" className="p-3 text-center">
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
				data-testid="topbarDropdown"
			>
				<Space>
					<AvatarImage userImg={`${picture}`} />
					<p>{firstName || 'User'}</p>
					<FaChevronDown />
				</Space>
			</Dropdown>
		</>
	);
}
