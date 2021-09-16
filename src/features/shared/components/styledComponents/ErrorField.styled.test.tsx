import renderer from 'react-test-renderer';
import ErrorField from 'features/shared/components/styledComponents/ErrorField.styled';

it('Styled Title Snapshot', () => {
	const tree = renderer.create(<ErrorField />).toJSON();
	expect(tree).toMatchSnapshot();
});
