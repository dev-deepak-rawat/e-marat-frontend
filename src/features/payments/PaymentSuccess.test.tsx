import { render, fireEvent, act } from '@testing-library/react';
import { useState } from 'react';
import PaymentSuccess from './PaymentSuccess';

const PaymentSuccessTest = () => {
	const [orderId, setOrderId] = useState('TEST_ORDER');
	return (
		<PaymentSuccess
			orderId={orderId}
			handleSuccessClick={() => setOrderId('')}
		/>
	);
};

describe('Payment success component', () => {
	it('TEST_ORDER should be in the dom initially', () => {
		const { getByText } = render(<PaymentSuccessTest />);
		expect(getByText(/TEST_ORDER/i)).toBeInTheDocument();
	});

	it('On click button, TEST_ORDER should not be in the dom', () => {
		const { getByText, queryByText } = render(<PaymentSuccessTest />);
		act(() => {
			const backButton = getByText(/Back To Screen/i);
			fireEvent.click(backButton);
		});
		expect(queryByText(/TEST_ORDER/i)).toBe(null);
	});
});
