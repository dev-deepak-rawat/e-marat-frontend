import renderer from 'react-test-renderer';
import ContainerCard from 'features/shared/components/styledComponents/ContainerCard';

it('Styled Title Snapshot', () => {
	const tree = renderer.create(<ContainerCard />).toJSON();
	expect(tree).toMatchSnapshot();
});
