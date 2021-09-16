/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import PaymentsComponent from 'features/payments/PaymentsComponent';

describe('Payments component', () => {
	it('if loading true show loading...', () => {
		const { getByText } = render(
			<PaymentsComponent
				displayRazorpay={jest.fn as any}
				loading={true}
				paymentInfo={paymentTestData as any}
			/>
		);

		expect(getByText(/loading.../i)).toBeInTheDocument();
	});

	it('if loading true show loading...', () => {
		const { getByText } = render(
			<PaymentsComponent
				displayRazorpay={jest.fn as any}
				loading={false}
				paymentInfo={paymentTestData as any}
			/>
		);
		expect(getByText(/Total ₹1200/i)).toBeInTheDocument();
	});
});

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
