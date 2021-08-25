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

export default function Topbar() {
	const title = getPageTitle(menuData);
	return <Header>{title}</Header>;
}
