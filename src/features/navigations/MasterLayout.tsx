import type { PropsWithChildren } from 'react';
import { Layout } from 'antd';
import Sidebar from 'features/navigations/Sidebar';
import Main from 'features/navigations/Main';
import Topbar from 'features/navigations/Topbar';

export default function MasterLayout(props: PropsWithChildren<{}>) {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sidebar />
			<Layout className="site-layout">
				<Topbar />
				<Main {...props} />
			</Layout>
		</Layout>
	);
}
