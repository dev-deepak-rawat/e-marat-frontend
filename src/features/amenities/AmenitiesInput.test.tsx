import AmenitiesInput from 'features/amenities/AmenitiesInput';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { store } from 'config/store';

it('Amenity Input', () => {
	const tree = renderer
		.create(
			<Provider store={store}>
				<AmenitiesInput isVisible={false} setIsVisible={jest.fn()} />
			</Provider>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
