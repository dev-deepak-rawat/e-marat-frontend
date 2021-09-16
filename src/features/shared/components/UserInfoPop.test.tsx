import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import UserInfoPop from 'features/shared/components/UserInfoPop';

it('User Info Pop on hover children flat no should be in the screen', async () => {
	const { getByText } = render(
		<UserInfoPop flat="432" phone="9999999999">
			<p>Test Pop</p>
		</UserInfoPop>
	);
	const textElement = getByText(/Test Pop/i);
	fireEvent.mouseOver(textElement);
	await waitFor(() => screen.findByText('432'));
	expect(getByText('432')).toBeInTheDocument();
});
