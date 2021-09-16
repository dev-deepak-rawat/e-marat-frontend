import renderer from 'react-test-renderer';
import FormContainer from 'features/shared/components/styledComponents/FormContainer.style';

it('Styled Title Snapshot', () => {
	const tree = renderer.create(<FormContainer />).toJSON();
	expect(tree).toMatchSnapshot();
});
