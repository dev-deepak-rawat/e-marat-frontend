import renderer from 'react-test-renderer';
import ImageCenetered from 'features/shared/components/styledComponents/ImageCentered.style';

it('Styled Title Snapshot', () => {
	const tree = renderer.create(<ImageCenetered />).toJSON();
	expect(tree).toMatchSnapshot();
});
