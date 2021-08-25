import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'index.css';
import { store } from 'app/store';
import ErrorBoundary from 'app/ErrorBoundary';
import ManageUser from 'features/manageUser/ManageUser';
import Home from 'features/home/Home';
import ManageAmenities from 'features/manageAmenities/ManageAmenities';
import CreateUser from 'features/manageUser/CreateUser';
import ProtectedRoute from 'app/ProtectedRoute';
import { ROLES, STYLE_COMPONENT_THEME } from 'lib/constants';
import PageNotFound from 'features/PageNotFound';
import MyPayments from 'features/myPayments/MyPayments';
import Dashboard from 'features/dashboard/Dashboard';
import MasterLayout from 'features/navigations/MasterLayout';
import SocialFeed from 'features/socialFeeds/SocialFeed';
import ManageComplaints from 'features/complaints/ManageComplaints';
import CreateComplaint from 'features/complaints/CreateComplaint';
import Transactions from 'features/myPayments/Transactions';
import Broadcasts from 'features/broadcasts/Broadcasts';

export default function App() {
	return (
		<Provider store={store}>
			<ThemeProvider theme={STYLE_COMPONENT_THEME}>
				<ErrorBoundary>
					<ToastContainer />
					<div id="recaptcha-container" />
					<BrowserRouter>
						<Switch>
							<Route path="/" exact>
								<Home />
							</Route>
							<Route path="/404" exact>
								<PageNotFound />
							</Route>
							<MasterLayout>
								<Switch>
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
									<ProtectedRoute
										path="/social-feeds"
										component={SocialFeed}
										exact
									/>
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
									<ProtectedRoute
										path="/broadcasts"
										component={Broadcasts}
										exact
									/>
									<Redirect from="*" to="/404" />
								</Switch>
							</MasterLayout>
						</Switch>
					</BrowserRouter>
				</ErrorBoundary>
			</ThemeProvider>
		</Provider>
	);
}
