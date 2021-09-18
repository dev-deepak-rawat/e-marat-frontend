import { Redirect, Route, Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import SpinContainer from 'features/shared/components/styledComponents/SpinContainer';
import ProtectedRoute from 'config/ProtectedRoute';
import { ROLES } from 'lib/constants';
import { useAuth } from 'config/hooks';
import Home from 'features/home/Home';
import PageNotFound from 'features/errorPages/404';
import Profile from 'features/profile/Profile';

const ManageUsers = lazy(() => import('features/users/ManageUsers'));
const MyAmenities = lazy(() => import('features/amenities/MyAmenities'));
const ManageAmenities = lazy(
	() => import('features/amenities/ManageAmenities')
);
const Transactions = lazy(() => import('features/payments/Transactions'));
const MyComplaints = lazy(() => import('features/complaints/MyComplaints'));
const ManageComplaints = lazy(
	() => import('features/complaints/ManageComplaints')
);
const Broadcasts = lazy(() => import('features/broadcasts/Broadcasts'));
const MyPayments = lazy(() => import('features/payments/MyPayments'));
const Dashboard = lazy(() => import('features/dashboard/Dashboard'));
const SocialFeed = lazy(() => import('features/socialFeed/SocialFeed'));
const Announcements = lazy(() => import('features/payments/MyPayments'));

export default function Routes() {
	const { isAdmin } = useAuth();

	return (
		<Suspense
			fallback={
				<SpinContainer className="mt-12">
					<Spin tip="loading..." />
				</SpinContainer>
			}
		>
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
					path="/social-feed"
					component={SocialFeed}
					exact
				/>
				<ProtectedRoute
					path="/payments"
					role={ROLES.RESIDENT}
					component={MyPayments}
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

				<ProtectedRoute path="/profile" component={Profile} exact />
				<ProtectedRoute
					path="/broadcasts"
					component={Broadcasts}
					exact
				/>
				<Redirect from="*" to="/404" />
			</Switch>
		</Suspense>
	);
}
