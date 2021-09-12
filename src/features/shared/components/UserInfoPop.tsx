import { Popover } from 'antd';

type PropsType = {
	flat?: string;
	phone?: string;
	children: React.ReactNode;
};

export default function Button({ flat, phone, children }: PropsType) {
	return flat || phone ? (
		<Popover
			content={
				<div>
					{flat && (
						<p>
							Flat :<b> {flat}</b>
						</p>
					)}
					{phone && (
						<p>
							Phone :<b> {phone}</b>
						</p>
					)}
				</div>
			}
		>
			{children}
		</Popover>
	) : (
		<>{children}</>
	);
}
