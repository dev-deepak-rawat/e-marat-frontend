import AvatarImage from 'features/shared/components/image/AvatarImage';
import { TEST_IMG_URL } from 'lib/constants';
import renderer from 'react-test-renderer';

it('Image Template', () => {
	const tree = renderer
		.create(<AvatarImage userImg={TEST_IMG_URL} />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
