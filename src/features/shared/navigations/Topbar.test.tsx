import { render } from '@testing-library/react';
import Topbar from 'features/shared/navigations/Topbar';
import { Provider } from 'react-redux';
import { store } from 'config/store';
import * as hooks from 'config/hooks';

describe('Topbar component', () => {
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

	it('show firstname of the user if in auth', () => {
		jest.spyOn(hooks, 'useAuth').mockImplementation(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			() => useAuthReturnObj as any
		);

		const { getByText } = render(
			<Provider store={store}>
				<Topbar />
			</Provider>
		);

		const userNameElement = getByText(
			useAuthReturnObj.userInfo.claims.firstName
		);
		expect(userNameElement).toBeInTheDocument();
	});
});
