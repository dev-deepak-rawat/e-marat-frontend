import tw from 'twin.macro';
import styled from 'styled-components';

export default styled.div`
	${tw`
		mx-auto
		bg-white
		shadow-lg
		p-7
		h-full
	`}
	width: ${(props: { width?: string }) => props.width || ''};
`;
