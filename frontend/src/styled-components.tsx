import styled from 'styled-components'

interface CardProps {
    $secondary?: boolean
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
    gap: 12px;
`