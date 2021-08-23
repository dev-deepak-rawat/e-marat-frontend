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
// import CreateUser from 'features/manageUser/CreateUser';

export default function MasterLayout() {
	return (
		<Provider store={store}>
			<ErrorBoundary>
				<ToastContainer />
				<div id="recaptcha-container" />
				<BrowserRouter>
					<Switch>
						<Route path="/user">
							<ManageUser />
						</Route>
						{/* <Route path="/create-user">
                            <CreateUser />
                        </Route> */}
						<Route path="/amenity">
							<ManageAmenities />
						</Route>
						<Route path="/" exact>
							<Home />
						</Route>
					</Switch>
				</BrowserRouter>
			</ErrorBoundary>
		</Provider>
	);
}
