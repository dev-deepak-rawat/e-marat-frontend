import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'index.css';
import * as serviceWorker from 'serviceWorker';
import { store } from 'app/store';
import ErrorBoundary from 'app/ErrorBoundary';
import ManageUser from 'features/manageUser/ManageUser';
import Home from 'features/home/Home';
import ManageAmenities from 'features/manageAmenities/ManageAmenities';
import initSentry from 'app/initSentry';
import { listenUserAuthState } from 'lib/firebaseAuth';

initSentry();
listenUserAuthState();

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ErrorBoundary>
				<ToastContainer />
				<div id="recaptcha-container" />
				<BrowserRouter>
					<Switch>
						<Route path="/user">
							<ManageUser />
						</Route>
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
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
