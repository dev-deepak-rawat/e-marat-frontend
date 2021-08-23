import React from 'react';

type PropsType = {
	type?: 'button' | 'submit';
	children: React.ReactNode;
	color?: 'primary' | 'danger' | 'warning' | 'success' | 'emarat-accent';
	loading?: boolean;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({
	type = 'button',
	color = 'primary',
	loading = false,
	children,
	onClick,
}: PropsType) {
	return (
		<button
			type={type}
			className={`inline-block mt-6 py-3 px-10 bg-${color}-default hover:bg-${color}-hover active:bg-${color}-active text-white font-bold rounded-full`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
