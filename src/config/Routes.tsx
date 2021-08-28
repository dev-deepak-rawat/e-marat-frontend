import { Redirect, Route, Switch } from 'react-router-dom';
import ProtectedRoute from 'config/ProtectedRoute';
import ManageUser from 'features/users/ManageUser';
import Home from 'features/home/Home';
import ManageAmenities from 'features/amenities/ManageAmenities';
import CreateUser from 'features/users/CreateUser';
import MyPayments from 'features/payments/MyPayments';
import Dashboard from 'features/dashboard/Dashboard';
import SocialFeed from 'features/socialFeed/SocialFeed';
import ManageComplaints from 'features/complaints/ManageComplaints';
import CreateComplaint from 'features/complaints/CreateComplaint';
import Transactions from 'features/payments/Transactions';
import Broadcasts from 'features/broadcasts/Broadcasts';
import PageNotFound from 'features/errorPages/404';
import { ROLES } from 'lib/constants';
import Profile from 'features/profile/Profile';

export default function Routes() {
	return (
		<Switch>
			<Route path="/" exact>
				<Home />
			</Route>
			<Route path="/404" exact>
				<PageNotFound />
			</Route>
			<ProtectedRoute
				path="/manage-user*"
				role={ROLES.ADMIN}
				component={ManageUser}
				exact
			/>
			<ProtectedRoute
				path="/create-user"
				role={ROLES.ADMIN}
				component={CreateUser}
				exact
			/>
			<ProtectedRoute
				path="/amenities"
				component={ManageAmenities}
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
			<ProtectedRoute path="/social-feeds" component={SocialFeed} exact />
			<ProtectedRoute
				path="/create-amenity"
				role={ROLES.ADMIN}
				component={ManageAmenities}
				exact
			/>
			<ProtectedRoute
				path="/manage-complaints"
				role={ROLES.ADMIN}
				component={ManageComplaints}
				exact
			/>
			<ProtectedRoute
				path="/complaint"
				role={ROLES.RESIDENT}
				component={CreateComplaint}
				exact
			/>
			<ProtectedRoute path="/profile" component={Profile} exact />
			<ProtectedRoute path="/broadcasts" component={Broadcasts} exact />
			<Redirect from="*" to="/404" />
		</Switch>
	);
}
