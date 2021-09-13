import { Content } from 'antd/lib/layout/layout';
import type { PropsWithChildren } from 'react';

export default function Main({ children }: PropsWithChildren<{}>) {
	return (
		<Content>
			<div className="site-layout-background pt-12 px-2 sm:pt-0 sm:px-3">
				{children}
			</div>
		</Content>
	);
}
