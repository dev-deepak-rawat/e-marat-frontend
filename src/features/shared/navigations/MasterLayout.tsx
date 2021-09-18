import { PropsWithChildren, useState } from 'react';
import { Layout } from 'antd';
import Sidebar from 'features/shared/navigations/Sidebar';
import Main from 'features/shared/navigations/Main';
import Topbar from 'features/shared/navigations/Topbar';
import { useLocation } from 'react-router-dom';
import { useOrientation } from 'config/hooks';
import { SiteLayout } from 'features/shared/components/styledComponents/SiteLayout';
import { toast } from 'react-toastify';

export default function MasterLayout(props: PropsWithChildren<{}>) {
	const { isMobileSize } = useOrientation();
	const [collapsed, onCollapse] = useState(isMobileSize);
	const location = useLocation();
	if (['/', '/404'].includes(location.pathname)) return <>{props.children}</>;

	const networkChangeEvent = () => {
		if (navigator.onLine) {
			toast.dismiss();
			toast.success('Back Online!');
		} else {
			toast.dismiss();
			toast.error("You're Offline!");
		}
	};
	window.addEventListener('online', networkChangeEvent);
	window.addEventListener('offline', networkChangeEvent);

	return (
		<Layout className="min-h-screen">
			<SiteLayout collapsed={collapsed}>
				<Topbar />
				<Main {...props} />
			</SiteLayout>
			<Sidebar {...{ collapsed, onCollapse, isMobileSize }} />
		</Layout>
	);
}
