import styled from 'styled-components'

interface CardProps {
    $secondary?: boolean
    $gap?: string
}

export const HeaderPreset1 = styled.h1`
    font-size: 2rem;
    line-height: 120%;
`

export const HeaderPreset2 = styled.h2`
    font-size: 1.25rem;
    line-height: 120%;
`

export const Card = styled.div.attrs<CardProps>(props => ({
    className: props.$secondary ? 'text-white bg-grey-900' : 'bg-white text-grey-900',
}))`
    border-radius: 10px;
    padding: 28px 24px;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: ${props => props.$gap || '12px'};
`

export const PrimaryButton = styled.button.attrs({
    className: 'font-semibold text-white bg-grey-900 px-5 py-4 rounded-lg h-full hover:bg-grey-500 duration-300'
})``

export const SecondaryButton = styled.button.attrs({
    className: 'bg-beige-100 font-bold w-1/2 p-4 rounded-lg border border-transparent hover:bg-white hover:border-grey-300 duration-300'
})``

export const Label = styled.label.attrs({
    className: 'font-bold text-grey-500 text-[14px]'
})``

export const ErrorText = styled.p.attrs({
    className: 'text-red font-bold'
})``
