import { render } from '@testing-library/react';
import ComplaintInput from 'features/complaints/ComplaintInput';
import { Provider } from 'react-redux';
import { store } from 'config/store';

it('if isVisible is true then generic form component is rendered in the screen', () => {
	const { getByText } = render(
		<Provider store={store}>
			<ComplaintInput
				isVisible={true}
				setIsVisible={jest.fn}
				edit={null}
				submitCallback={jest.fn}
			/>
		</Provider>
	);
	expect(getByText(/update complaint/i)).toBeInTheDocument();
});
