import styled from 'styled-components';
import tw from 'twin.macro';

export const InputContainer = styled.div`
	${tw`
        w-full
        border-solid
        border-2
        rounded-lg
        px-2
        h-8
        my-4
        sm:w-1/2
    `}
`;

export const InputBox = styled.input`
	width: 100%;
	${tw`
        placeholder-opacity-50
        pt-1
    `}
`;

export const SelectBox = styled.select`
	width: 100%;
	${tw`
        bg-white
        pt-1
    `}
`;

export const Error = styled.div`
	${tw`
        text-red-500
        font-semibold
        mt-1
    `}
`;
