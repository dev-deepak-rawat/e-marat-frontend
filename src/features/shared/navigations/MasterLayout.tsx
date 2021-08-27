import type { PropsWithChildren } from 'react';
import { Layout } from 'antd';
import Sidebar from 'features/shared/navigations/Sidebar';
import Main from 'features/shared/navigations/Main';
import Topbar from 'features/shared/navigations/Topbar';
import { useLocation } from 'react-router-dom';

export default function MasterLayout(props: PropsWithChildren<{}>) {
    const location = useLocation();
    if (['/', '/404'].includes(location.pathname))
        return <>{props.children}</>

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
