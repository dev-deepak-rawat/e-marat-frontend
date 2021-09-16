import renderer from 'react-test-renderer';
import Card from 'features/shared/components/styledComponents/Card';

it('Styled Title Snapshot', () => {
	const tree = renderer.create(<Card />).toJSON();
	expect(tree).toMatchSnapshot();
});
