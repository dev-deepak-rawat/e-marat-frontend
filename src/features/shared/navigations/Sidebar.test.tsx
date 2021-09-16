/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, act } from '@testing-library/react';
import { useState } from 'react';
import Sidebar from 'features/shared/navigations/Sidebar';
import { Provider } from 'react-redux';
import { store } from 'config/store';
import Routes from 'config/Routes';
import { BrowserRouter } from 'react-router-dom';
import { saveAuthUser } from 'features/shared/reducers/authSlice';

const TestSidebar = () => {
	const [collapsed, onCollapse] = useState(false);
	return <Sidebar {...{ collapsed, onCollapse, isMobileSize: false }} />;
};

const useAuthReturnObj = {
	uniqueId: 'iurueiw34ui23',
	isLoaded: true,
	isAdmin: false,
	isLoggedIn: true,
	userInfo: {
		claims: {
			firstName: 'Resident',
			lastName: 'Rawat',
			picture: '',
		},
	},
};

describe('Sidebar component', () => {
	it('homepage renderend if no auth', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<Routes />
					<TestSidebar />
				</BrowserRouter>
			</Provider>
		);

		expect(
			screen.getByText(/Connect together to build a smart society/i)
		).toBeInTheDocument();
	});

	it('on soical feed if resident', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<Routes />
					<TestSidebar />
				</BrowserRouter>
			</Provider>
		);

		act(() => {
			if (store) {
				store.dispatch(saveAuthUser(useAuthReturnObj as any));
			}
		});
		expect(
			screen.getByRole('link', { name: /social feed/i })
		).toBeInTheDocument();
	});
});
