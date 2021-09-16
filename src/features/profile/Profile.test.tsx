import { render, fireEvent, act } from '@testing-library/react';
import Profile from 'features/profile/Profile';
import * as hooks from 'config/hooks';
import { Provider } from 'react-redux';
import { store } from 'config/store';

const profileData = {
	_id: '61238558e2ef9724bc97e672',
	firstName: 'Admin',
	lastName: 'Bob',
	phone: '9999999999',
	flat: '401',
	picture:
		'https://res.cloudinary.com/emarat/image/upload/v1630151165/admin_pkd1ut.jpg',
};

describe('Profile', () => {
	it('if api call is loading, show spin loader', () => {
		jest.spyOn(hooks, 'useApiCall').mockImplementation(() => ({
			loading: true,
			data: {},
			isFetchedOnce: false,
		}));
		const { getByText } = render(<Profile />);
		expect(getByText(/loading.../i)).toBeInTheDocument();
	});

	it('if data is loaded then data should be in the dom', () => {
		jest.spyOn(hooks, 'useApiCall').mockImplementation(() => ({
			loading: false,
			data: profileData,
			isFetchedOnce: true,
		}));
		const { getByText, queryByText, getByPlaceholderText, getByTestId } =
			render(
				<Provider store={store}>
					<Profile />
				</Provider>
			);
		expect(queryByText(/loading.../i)).toBe(null);
		expect(getByText(/My profile/i)).toBeInTheDocument();
		const lastName = getByPlaceholderText(/Last Name/i);
		act(() => {
			fireEvent.change(lastName, { target: { value: '' } });

			const submitButton = getByTestId('submitButton');
			fireEvent.click(submitButton);
		});

		expect(lastName.textContent).toBe('');
	});
});
