import { TailwindClassesNumbers } from 'lib/types';
import { useState, useEffect } from 'react';

export type PropsType = {
	startFrom: 'top' | 'left' | 'right';
	strength?: TailwindClassesNumbers;
	children: React.ReactNode;
};

export default function AnimateOnLoad({
	startFrom,
	strength = 60,
	children,
}: PropsType) {
	const initialAnimationClasses = {
		top: `-translate-y-${strength}`,
		left: `-translate-x-${strength}`,
		right: `translate-x-${strength}`,
	};

	const [animationClasses, setAnimationClasses] = useState<string>(
		initialAnimationClasses[startFrom]
	);

	useEffect(() => {
		setAnimationClasses('');

		return () => {
			setAnimationClasses(initialAnimationClasses[startFrom]);
		};
	}, []);

	return (
		<div
			className={`transform transition-transform delay-100 ease-in duration-500 ${animationClasses}`}
		>
			{children}
		</div>
	);
}
