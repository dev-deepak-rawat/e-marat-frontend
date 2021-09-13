import AvatarImage from 'features/shared/components/image/AvatarImage';
import renderer from 'react-test-renderer';

it('Image Template', () => {
	const userImg =
		'https://res.cloudinary.com/emarat/image/upload/v1631362403/dfejes8g9doeysyniydd.png';
	const tree = renderer.create(<AvatarImage userImg={userImg} />).toJSON();
	expect(tree).toMatchSnapshot();
});
