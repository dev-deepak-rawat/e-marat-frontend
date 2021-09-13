import StyledTitle from 'features/shared/components/styledComponents/StyledTitle';
import renderer from 'react-test-renderer';

it('Styled Title Snapshot', () => {
	const tree = renderer.create(<StyledTitle />).toJSON();
	expect(tree).toMatchSnapshot();
});
