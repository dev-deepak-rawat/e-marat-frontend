import renderer from 'react-test-renderer';
import SpinContainer from 'features/shared/components/styledComponents/SpinContainer';

it('Styled Title Snapshot', () => {
	const tree = renderer.create(<SpinContainer />).toJSON();
	expect(tree).toMatchSnapshot();
});
