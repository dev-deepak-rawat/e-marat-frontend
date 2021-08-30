import styled from 'styled-components';

export const ColoredBox = styled.div`
	width: ${(props: { size?: string }) => props.size || '1em'};
	height: ${(props: { size?: string }) => props.size || '1em'};
	background: ${(props: { color?: string }) => props.color || '#fff'};
`;
