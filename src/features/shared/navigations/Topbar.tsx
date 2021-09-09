import { Avatar, Typography, Space, Dropdown, Menu } from 'antd';
import { AiOutlineUser } from 'react-icons/ai';
import { FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { signOut } from 'lib/firebaseAuth';
import { useAuth, useOrientation } from 'config/hooks';
import { transformCloudinaryImage } from 'lib/utils';
import { CLOUDINARY_IMAGES } from 'lib/constants';

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
	const { isMobile } = useOrientation();
	const { userInfo, isAdmin } = useAuth();
	const { claims = {} } = userInfo || {};
	const { firstName = '', picture } = claims;

	return (
		<>
			{isMobile && (
				<Space size="small" className="absolute top-2 right-40">
					<img
						src={CLOUDINARY_IMAGES.LOGO}
						alt="logo"
						className="h-8"
					/>
					<span className=" text-emarat-secondary-default">
						MARAT
					</span>
				</Space>
			)}
			<Dropdown
				overlay={getMenu(isAdmin)}
				className="absolute top-1.5 right-2 sm:top-2.5 sm:right-4"
			>
				<Space>
					<Avatar
						size={35}
						className={picture ? '' : 'p-1'}
						icon={<AiOutlineUser size="28px" />}
						shape="circle"
						src={transformCloudinaryImage(`${picture}`, 'AVATAR')}
					/>
					<Text>{firstName || 'User'}</Text>
					<FaChevronDown />
				</Space>
			</Dropdown>
		</>
	);
}
