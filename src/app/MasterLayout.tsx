import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'index.css';
import { store } from 'app/store';
import ErrorBoundary from 'app/ErrorBoundary';
import ManageUser from 'features/manageUser/ManageUser';
import Home from 'features/home/Home';
import ManageAmenities from 'features/manageAmenities/ManageAmenities';
import CreateUser from 'features/manageUser/CreateUser';
import ProtectedRoute from 'app/ProtectedRoute';
import { ROLES } from 'lib/constants';
import PageNotFound from 'features/PageNotFound';
import MyPayments from 'features/myPayments/MyPayments';
import Dashboard from 'features/dashboard/Dashboard';

export default function MasterLayout() {
	return (
		<Provider store={store}>
			<ErrorBoundary>
				<ToastContainer />
				<div id="recaptcha-container" />
				<BrowserRouter>
					<Switch>
						<ProtectedRoute
							path="/user"
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
							path="/amenity"
							role={ROLES.ADMIN}
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
							path="/dashboard"
							role={ROLES.ADMIN}
							component={Dashboard}
							exact
						/>
						<Route path="/" exact>
							<Home />
						</Route>
						<Route path="/404" exact>
							<PageNotFound />
						</Route>
						<Route>
							<PageNotFound />
						</Route>
					</Switch>
				</BrowserRouter>
			</ErrorBoundary>
		</Provider>
	);
}
