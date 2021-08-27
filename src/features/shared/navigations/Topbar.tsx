import styled from 'styled-components';
import tw from 'twin.macro';
import { menuData } from 'features/shared/navigations/menuData';
import { getPageTitle } from 'features/shared/navigations/menuHelper';
import { signOut } from 'lib/firebaseAuth';

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
            <button type="button" onClick={() => signOut()}>Logout</button>
        </Header>
    );
}
