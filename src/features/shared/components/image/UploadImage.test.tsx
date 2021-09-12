import { render, fireEvent } from '@testing-library/react';
import UploadImage from 'features/shared/components/image/UploadImage';
import { Provider } from 'react-redux';
import { store } from 'config/store';
import { setImageUrl } from 'features/shared/components/image/imageSlice';
import { act } from 'react-dom/test-utils';

describe('Upload Image ', () => {
	const imageUrl =
		'https://res.cloudinary.com/emarat/image/upload/v1631362403/dfejes8g9doeysyniydd.png';
	const { getByTestId } = render(
		<Provider store={store}>
			<UploadImage />
		</Provider>
	);

	act(() => {
		if (store) {
			store.dispatch(setImageUrl(imageUrl));
		}
	});

	const crossButton = getByTestId('crossButton');

	it('Redux store image url should be in the img src', () => {
		expect(getByTestId('uploadedImage').getAttribute('src')).toBe(imageUrl);
	});

	it('If imageUrl in store then cross button is present', () => {
		expect(crossButton.innerHTML).toBe('x');
	});

	it('if cross button is removed then cross button should not present', () => {
		fireEvent.click(crossButton);
		expect(crossButton).not.toBeInTheDocument();
	});
});
