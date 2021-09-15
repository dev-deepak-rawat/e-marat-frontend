import Page404 from 'features/errorPages/404';
import renderer from 'react-test-renderer';

it('404 error page', () => {
	const tree = renderer.create(<Page404 />).toJSON();
	expect(tree).toMatchSnapshot();
});
