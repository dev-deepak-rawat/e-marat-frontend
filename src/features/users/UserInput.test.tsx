import renderer from 'react-test-renderer';
import UserInput from 'features/users/UserInput';

it('Login Form', () => {
	const tree = renderer
		.create(<UserInput isVisible={false} setIsVisible={jest.fn()} />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
