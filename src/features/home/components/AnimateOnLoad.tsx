import styled from 'styled-components';
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
	const animationVariants = {
		top: `-translate-y-${strength}`,
		left: `-translate-x-${strength}`,
		right: `translate-x-${strength}`,
	};
	const initialAnimationClasses = `opacity-0 ${animationVariants[startFrom]}`;

	const [animationClasses, setAnimationClasses] = useState<string>(
		initialAnimationClasses
	);

	useEffect(() => {
		setAnimationClasses('');

		return () => {
			setAnimationClasses(initialAnimationClasses);
		};
	}, []);

	return (
		<Root
			className={`transform delay-100 ease-in duration-500 ${animationClasses}`}
		>
			{children}
		</Root>
	);
}

const Root = styled.div`
	transition: transform 2s cubic-bezier(0, 1, 0.3, 1), opacity 0.7s ease-out;
	will-change: transform, opacity;
`;
