import renderer from 'react-test-renderer';
import { ColoredBox } from 'features/shared/components/styledComponents/ColoredBox';

it('Styled Title Snapshot', () => {
	const tree = renderer.create(<ColoredBox />).toJSON();
	expect(tree).toMatchSnapshot();
});
