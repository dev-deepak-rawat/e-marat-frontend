import renderer from 'react-test-renderer';
import ContainerCardTitle from 'features/shared/components/styledComponents/ContainerCardTitle';

it('Styled Title Snapshot', () => {
	const tree = renderer.create(<ContainerCardTitle />).toJSON();
	expect(tree).toMatchSnapshot();
});
