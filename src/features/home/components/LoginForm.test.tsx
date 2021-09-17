import renderer from 'react-test-renderer';
import LoginForm from 'features/home/components/LoginForm';

it('Login Form', () => {
	const tree = renderer.create(<LoginForm />).toJSON();
	expect(tree).toMatchSnapshot();
});
