import AnimateOnLoad from 'features/home/components/AnimateOnLoad';
import renderer from 'react-test-renderer';

it('Animate On Load', () => {
	const tree = renderer
		.create(
			<AnimateOnLoad animationStartClasses="opacity-0">
				mock child
			</AnimateOnLoad>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
