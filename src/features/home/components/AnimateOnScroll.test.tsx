import AnimateOnScroll from 'features/home/components/AnimateOnScroll';
import renderer from 'react-test-renderer';

it('Animate On Load', () => {
	const tree = renderer
		.create(<AnimateOnScroll>mock child</AnimateOnScroll>)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
