import { PropsWithChildren } from 'react'
import styled from 'styled-components'

const Button = styled.div`
    width: 64px;
    height: 64px;
    cursor: pointer;
    background-color: #000000;
    color: #777777;
    border-bottom: 1px solid #333333;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;

    &:hover {
        background-color: #222222;
        color: #eeeeee;
    }
`

export const SidebarButton = ({
    children,
    onClick,
}: PropsWithChildren<{
    onClick: () => void
}>) => {
    return <Button onClick={onClick}>{children}</Button>
}
