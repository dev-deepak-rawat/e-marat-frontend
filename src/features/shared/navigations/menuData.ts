import { FaUserEdit, FaUserPlus } from 'react-icons/fa';
import { AiFillDashboard } from 'react-icons/ai';
import { HiUsers, HiCurrencyRupee } from 'react-icons/hi';
import { CgGym } from 'react-icons/cg';
import { GiGymBag } from 'react-icons/gi';
import { GoIssueOpened } from 'react-icons/go';
import { RiBroadcastFill, RiFileList2Fill } from 'react-icons/ri';
import { ROLES } from 'lib/constants';

export const menuData = [
	{
		id: 'dashboard',
		link: '/dashboard',
		label: 'Dashboard',
		icon: AiFillDashboard,
		role: ROLES.ADMIN,
	},
	{
		id: 'manageUser',
		link: '/manage-user',
		label: 'Manage User',
		icon: FaUserEdit,
		role: ROLES.ADMIN,
	},
	{
		id: 'createUser',
		link: '/create-user',
		label: 'Create User',
		icon: FaUserPlus,
		role: ROLES.ADMIN,
	},
	{
		id: 'socialFeeds',
		link: '/social-feeds',
		label: 'Social Feeds',
		icon: HiUsers,
		role: '',
	},
	{
		id: 'amenities',
		link: '/amenities',
		label: 'Amenities',
		icon: CgGym,
		role: '',
	},
	{
		id: 'createAmenity',
		link: '/create-amenity',
		label: 'Create Amenity',
		icon: GiGymBag,
		role: ROLES.ADMIN,
	},
	{
		id: 'manageComplaints',
		link: '/manage-complaints',
		label: 'Compalints',
		icon: GoIssueOpened,
		role: ROLES.ADMIN,
	},
	{
		id: 'complaint',
		link: '/complaint',
		label: 'Complaint',
		icon: GoIssueOpened,
		role: ROLES.RESIDENT,
	},
	{
		id: 'broadcasts',
		link: '/broadcasts',
		label: 'Broadcasts',
		icon: RiBroadcastFill,
		role: '',
	},
	{
		id: 'transactions',
		link: '/transactions',
		label: 'Transactions',
		icon: RiFileList2Fill,
		role: '',
	},
	{
		id: 'payments',
		link: '/payments',
		label: 'My Payments',
		icon: HiCurrencyRupee,
		role: ROLES.RESIDENT,
	},
	{
		id: 'profile',
		link: '/profile',
		label: 'My Profile',
		icon: HiCurrencyRupee,
		role: 'na',
	},
];
