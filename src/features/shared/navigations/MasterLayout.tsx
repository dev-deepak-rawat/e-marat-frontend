import { PropsWithChildren, useState } from 'react';
import { Layout } from 'antd';
import Sidebar from 'features/shared/navigations/Sidebar';
import Main from 'features/shared/navigations/Main';
import Topbar from 'features/shared/navigations/Topbar';
import { useLocation } from 'react-router-dom';
import { useOrientation } from 'config/hooks';
import { SiteLayout } from 'features/shared/components/styledComponents/SiteLayout';

export default function MasterLayout(props: PropsWithChildren<{}>) {
	const { isMobile } = useOrientation();
	const [collapsed, onCollapse] = useState(isMobile);
	const location = useLocation();
	if (['/', '/404'].includes(location.pathname)) return <>{props.children}</>;

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<SiteLayout collapsed={collapsed}>
				<Topbar />
				<Main {...props} />
			</SiteLayout>
			<Sidebar {...{ collapsed, onCollapse, isMobile }} />
		</Layout>
	);
}
