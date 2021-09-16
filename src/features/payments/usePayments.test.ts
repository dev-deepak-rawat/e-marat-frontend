import { renderHook } from '@testing-library/react-hooks';
import { usePayment } from 'features/payments/usePayment';
import * as hooks from 'config/hooks';

describe('use payment test cases', () => {
	beforeEach(() => {
		jest.spyOn(hooks, 'useAuth').mockImplementation(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			() => useAuthReturnObj as any
		);

		jest.spyOn(hooks, 'useApiCall').mockImplementation(() => ({
			loading: false,
			data: paymentTestData,
			isFetchedOnce: false,
		}));
	});

	it('Use api call', async () => {
		const { result } = renderHook(() => usePayment());
		expect(result.current.paymentInfo.pay).toBe(1200);
	});
});

const useAuthReturnObj = {
	userInfo: {
		claims: {
			firstName: 'Resident',
			lastName: 'Rawat',
			phone: '8888888888',
			flat: '143',
		},
	},
};

const paymentTestData = {
	amenities: [
		{
			type: 'limited',
			_id: '613477077dc79e1e210673d0',
			icon: 'https://res.cloudinary.com/emarat/image/upload/v1630828292/qmjpju90vmdjqctbon8k.png',
			name: 'Gym',
			fee: 1000,
		},
		{
			type: 'basic',
			_id: '6134798de25a69237843e1a6',
			icon: 'https://res.cloudinary.com/emarat/image/upload/v1630828939/zwcf8v8ttnthw4b69bxn.png',
			name: 'CCTV',
			fee: 200,
		},
	],
	pay: 1200,
	paymentMonth: '8_2021',
	monthlyFee: 1200,
};
