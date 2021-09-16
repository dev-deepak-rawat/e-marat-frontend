/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import Transactions from 'features/payments/Transactions';
import * as hooks from 'config/hooks';

describe('Transactions component', () => {
	it('if show title true show title', () => {
		jest.spyOn(hooks, 'useAuth').mockImplementation(
			() => ({ isAdmin: true } as any)
		);
		const { getByTestId } = render(<Transactions showTitle />);
		expect(getByTestId('pageTitle')).toBeInTheDocument();
	});

	it('if show title true show title', () => {
		jest.spyOn(hooks, 'useAuth').mockImplementation(
			() => ({ isAdmin: true } as any)
		);
		const { queryByTestId } = render(<Transactions showTitle={false} />);
		expect(queryByTestId('pageTitle')).toBe(null);
	});

	it('if data is fetched and resident show data but dont show rensident name', () => {
		jest.spyOn(hooks, 'useAuth').mockImplementation(
			() => ({ isAdmin: false } as any)
		);
		jest.spyOn(hooks, 'useApiCall').mockImplementation(() => ({
			loading: false,
			data: transactionsTestData,
			isFetchedOnce: true,
		}));
		const { getByText, queryByText } = render(<Transactions />);
		expect(getByText(testOrderId)).toBeInTheDocument();
		expect(queryByText(testPhone)).toBe(null);
		expect(queryByText(/Rawat/i)).toBe(null);
	});
});

const testOrderId = 'order_Hxpj9YFkVNesVs';
const testPhone = '8888888888';

const transactionsTestData = [
	{
		_id: '614235d0ad139b001d60c3aa',
		orderId: testOrderId,
		amount: 2200,
		status: 'success',
		paidMonth: '8_2021',
		processedAt: '2021-09-15T18:05:19.000Z',
		paymentId: 'pay_HxpjPWXFlASDQB',
		phone: 'testPhone',
		firstName: 'Resident',
		lastName: 'Rawat',
		picture:
			'https://res.cloudinary.com/emarat/image/upload/v1630240741/cbdyq17xlmacdabg1gur.jpg',
		month: 'Sep 2021',
		name: 'Resident Rawat',
	},
];
