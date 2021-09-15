import TeamMember from 'features/home/components/TeamMember';
import { CLOUDINARY_IMAGES } from 'lib/constants';
import renderer from 'react-test-renderer';

it('Team member snapshot', () => {
	const tree = renderer
		.create(
			<TeamMember
				name="Haris Rahman"
				img={CLOUDINARY_IMAGES.HARIS}
				github="#"
				linkedin="#"
				twitter="#"
			/>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
