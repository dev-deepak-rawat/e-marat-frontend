import styled from 'styled-components';
import { elInViewport } from 'lib/utils';
import { useState, useRef, useEffect } from 'react';

export type PropsType = {
	animationStartClasses?: string;
	children: React.ReactNode;
};

export default function AnimateOnScroll({
	animationStartClasses = 'opacity-0 translate-y-10',
	children,
}: PropsType) {
	const [animationClasses, setAnimationClasses] = useState<string>(
		animationStartClasses
	);

	const rootDivRef = useRef<HTMLDivElement>(null);

	let frameRequestID: number;

	const animate = (currentClasses: string) => {
		let newClasses = currentClasses;

		if (rootDivRef.current) {
			// If element is in veiw then remove the animation classes
			if (elInViewport(rootDivRef.current)) {
				if (currentClasses !== '') {
					newClasses = '';
					setAnimationClasses(newClasses);
				}
			}
			// Otherwise if inital animation classes are not set to intial then do it
			else if (currentClasses !== animationStartClasses) {
				newClasses = animationStartClasses;
				setAnimationClasses(newClasses);
			}
		}
		frameRequestID = requestAnimationFrame(animate.bind(null, newClasses));
	};

	useEffect(() => {
		if (rootDivRef.current) {
			animate(animationStartClasses);
		}

		// Set animation to initial state and cancel animation frame on component unmount
		return () => {
			setAnimationClasses(animationStartClasses);
			if (frameRequestID) cancelAnimationFrame(frameRequestID);
		};
	}, []);

	return (
		<Root ref={rootDivRef} className={`transform ${animationClasses}`}>
			{children}
		</Root>
	);
}

const Root = styled.div`
	transition: transform 2s cubic-bezier(0, 1, 0.3, 1), opacity 0.7s ease-out;
	will-change: transform, opacity;
`;
