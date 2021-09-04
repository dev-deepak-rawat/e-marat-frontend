import tw from 'twin.macro';
import styled from 'styled-components';

export default styled.div`
	${tw`
		mx-auto
		bg-white
		shadow-lg
		p-2
		h-full
        sm:mt-2
	`}
	width: ${(props: { width?: string }) => props.width || ''};
`;
