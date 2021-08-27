import styled from 'styled-components';
import tw from 'twin.macro';

const Button = styled.button`
	${tw`
        w-auto
        text-center
        bg-brands-twitter
        text-white
        px-6
        py-1
        m-2
        my-3
        ml-0
        rounded-sm
        uppercase
        hover:bg-emarat-secondary
        hover:scale-125
    `}
`;

export default Button;
