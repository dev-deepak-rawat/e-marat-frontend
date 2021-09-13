import ImageTemplate from 'features/shared/components/image/ImageTemplate';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { store } from 'config/store';

it('Image Template', () => {
	const tree = renderer
		.create(
			<Provider store={store}>
				<ImageTemplate />
			</Provider>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
