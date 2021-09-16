import renderer from 'react-test-renderer';
import { SiteLayout } from 'features/shared/components/styledComponents/SiteLayout';

it('SiteLayout styled', () => {
	const tree = renderer.create(<SiteLayout collapsed />).toJSON();
	expect(tree).toMatchSnapshot();

	const tree2 = renderer.create(<SiteLayout collapsed={false} />).toJSON();
	expect(tree2).toMatchSnapshot();
});
