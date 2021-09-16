import PageTitle from 'features/shared/components/styledComponents/PageTitle';
import renderer from 'react-test-renderer';

it('Styled Title Snapshot', () => {
	const tree = renderer.create(<PageTitle />).toJSON();
	expect(tree).toMatchSnapshot();
});
