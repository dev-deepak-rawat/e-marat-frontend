import { Redirect, Route, Switch } from 'react-router-dom';
import ProtectedRoute from 'config/ProtectedRoute';
import ManageUsers from 'features/users/ManageUsers';
import Home from 'features/home/Home';
import ManageAmenities from 'features/amenities/ManageAmenities';
import MyAmenities from 'features/amenities/MyAmenities';
import MyPayments from 'features/payments/MyPayments';
import Dashboard from 'features/dashboard/Dashboard';
import SocialFeed from 'features/socialFeed/SocialFeed';
import ManageComplaints from 'features/complaints/ManageComplaints';
import MyComplaints from 'features/complaints/MyComplaints';
import Transactions from 'features/payments/Transactions';
import Broadcasts from 'features/broadcasts/Broadcasts';
import PageNotFound from 'features/errorPages/404';
import { ROLES } from 'lib/constants';
import Profile from 'features/profile/Profile';
import { useAuth } from 'config/hooks';
import Announcements from 'features/announcements/Announcements';

export default function Routes() {
	const { isAdmin } = useAuth();

	return (
		<Switch>
			<Route path="/" exact>
				<Home />
			</Route>
			<Route path="/404" exact>
				<PageNotFound />
			</Route>
			<ProtectedRoute
				path="/users"
				role={ROLES.ADMIN}
				component={ManageUsers}
				exact
			/>
			<ProtectedRoute
				path="/amenities"
				component={isAdmin ? ManageAmenities : MyAmenities}
				exact
			/>
			<ProtectedRoute
				path="/payments"
				role={ROLES.RESIDENT}
				component={MyPayments}
				exact
			/>
			<ProtectedRoute
				path="/transactions"
				role={ROLES.ADMIN}
				component={Transactions}
				exact
			/>
			<ProtectedRoute
				path="/dashboard"
				role={ROLES.ADMIN}
				component={Dashboard}
				exact
			/>
			<ProtectedRoute
				path="/complaints"
				role=""
				component={isAdmin ? ManageComplaints : MyComplaints}
				exact
			/>
			<ProtectedRoute
				path="/announcements"
				role={ROLES.RESIDENT}
				component={Announcements}
				exact
			/>
			<ProtectedRoute path="/social-feed" component={SocialFeed} exact />
			<ProtectedRoute path="/profile" component={Profile} exact />
			<ProtectedRoute path="/broadcasts" component={Broadcasts} exact />
			<Redirect from="*" to="/404" />
		</Switch>
	);
}
