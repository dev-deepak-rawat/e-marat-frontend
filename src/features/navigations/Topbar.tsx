import styled from 'styled-components';
import tw from 'twin.macro';
import { menuData } from 'features/navigations/menuData';
import { getPageTitle } from 'features/navigations/menuHelper';

const Header = styled.div`
	${tw`
        flex
        bg-gray-200
        h-12
    `}
`;

const Title = styled.p`
	${tw`
        text-2xl
        pl-16
        pt-2
        font-medium
        sm:pl-12
    `}
`;

export default function Topbar() {
	const title = getPageTitle(menuData);
	return (
		<Header>
			<Title>{title}</Title>
		</Header>
	);
}
