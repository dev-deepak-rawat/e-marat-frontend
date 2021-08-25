import { Content } from 'antd/lib/layout/layout';
import type { PropsWithChildren } from 'react';

export default function Main({ children }: PropsWithChildren<{}>) {
	return (
		<Content style={{ margin: '0 16px' }}>
			<div
				className="site-layout-background"
				style={{ padding: 24, minHeight: 360 }}
			>
				{children}
			</div>
		</Content>
	);
}
