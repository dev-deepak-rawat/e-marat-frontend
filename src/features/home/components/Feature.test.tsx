import { faSwimmer } from '@fortawesome/free-solid-svg-icons';
import Feature from 'features/home/components/Feature';
import renderer from 'react-test-renderer';

it('Feature snapshot', () => {
	const tree = renderer
		.create(
			<Feature
				title="compalints resolved"
				number="400"
				icon={faSwimmer}
			/>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
