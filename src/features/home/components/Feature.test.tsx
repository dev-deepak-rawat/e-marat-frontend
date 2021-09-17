import { FaSwimmer } from 'react-icons/fa';
import Feature from 'features/home/components/Feature';
import renderer from 'react-test-renderer';

it('Feature snapshot', () => {
	const tree = renderer
		.create(
			<Feature
				title="compalints resolved"
				number="400"
				icon={FaSwimmer}
			/>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
