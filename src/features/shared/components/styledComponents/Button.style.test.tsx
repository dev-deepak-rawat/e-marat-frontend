import renderer from 'react-test-renderer';
import Button from 'features/shared/components/styledComponents/Button.style';

it('Styled Title Snapshot', () => {
	const tree = renderer.create(<Button />).toJSON();
	expect(tree).toMatchSnapshot();
});
