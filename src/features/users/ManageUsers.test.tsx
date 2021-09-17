import renderer from 'react-test-renderer';
import ManageUsers from 'features/users/ManageUsers';

it('Login Form', () => {
	const tree = renderer.create(<ManageUsers />).toJSON();
	expect(tree).toMatchSnapshot();
});
