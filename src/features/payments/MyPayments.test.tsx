import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import MyPayments from 'features/payments/MyPayments';

it('My Payments', () => {
	const tree = renderer.create(<MyPayments />).toJSON();
	expect(tree).toMatchSnapshot();

	const btn = screen.getByRole('radio', { name: /transactions/i });
	btn.click();

	const { getByText } = render(<MyPayments />);
	expect(getByText(/loading.../i)).toBeInTheDocument();
});
