import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'antd.less';
import 'index.css';
import { store } from 'config/store';
import ErrorBoundary from 'config/ErrorBoundary';
import { STYLE_COMPONENT_THEME } from 'lib/constants';
import MasterLayout from 'features/shared/navigations/MasterLayout';
import Routes from 'config/Routes';

export default function App() {
	return (
		<div className="emarat">
			<Provider store={store}>
				<ThemeProvider theme={STYLE_COMPONENT_THEME}>
					<ErrorBoundary>
						<ToastContainer autoClose={3000} />
						<div id="recaptcha-container" />
						<BrowserRouter>
							<MasterLayout>
								<Routes />
							</MasterLayout>
						</BrowserRouter>
					</ErrorBoundary>
				</ThemeProvider>
			</Provider>
		</div>
	);
}
