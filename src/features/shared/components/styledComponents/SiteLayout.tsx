import styled from 'styled-components';

export const SiteLayout = styled.div`
	margin-left: ${(props: { collapsed: boolean }) =>
		props.collapsed ? '80px' : '200px'};
	width: ${(props: { collapsed: boolean }) =>
		props.collapsed ? 'calc(100% - 80px)' : 'calc(100% - 200px)'};
	@media (max-width: 640px) {
		margin-left: 0px;
		width: 100%;
	}
`;
