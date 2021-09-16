import { render } from '@testing-library/react';
import App from 'App';

it('app container renders', () => {
	const { getByText } = render(<App />);
	expect(
		getByText(/Connect together to build a smart society/i)
	).toBeInTheDocument();
});
