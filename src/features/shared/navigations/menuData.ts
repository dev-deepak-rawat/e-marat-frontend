import { FaUserEdit } from 'react-icons/fa';
import { AiFillDashboard } from 'react-icons/ai';
import { HiUsers, HiCurrencyRupee } from 'react-icons/hi';
import { CgGym } from 'react-icons/cg';
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
		id: 'user',
		link: '/users',
		label: 'Users',
		icon: FaUserEdit,
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
		id: 'manageComplaints',
		link: '/manage-complaints',
		label: 'Complaints',
		icon: GoIssueOpened,
		role: ROLES.ADMIN,
	},
	{
		id: 'complaints',
		link: '/complaints',
		label: 'Complaints',
		icon: GoIssueOpened,
		role: ROLES.RESIDENT,
	},
	{
		id: 'broadcasts',
		link: '/broadcasts',
		label: 'Broadcasts',
		icon: RiBroadcastFill,
		role: ROLES.ADMIN,
	},
	{
		id: 'transactions',
		link: '/transactions',
		label: 'Transactions',
		icon: RiFileList2Fill,
		role: ROLES.ADMIN,
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
	{
		id: 'announcements',
		link: '/announcements',
		label: 'Announcements',
		icon: RiBroadcastFill,
		role: ROLES.RESIDENT,
	},
];
