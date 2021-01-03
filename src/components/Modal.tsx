import { ReactNode, KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

export const Modal = ({
    children,
    maxWidth,
    onCloseRequest,
}: {
    children: ReactNode
    maxWidth?: number
    onCloseRequest(): void
}) => {
    const handleKeydown = (event: KeyboardEvent) => {}

    return createPortal(
        <Container role="dialog" aria-modal="true" onKeyDown={handleKeydown}>
            <Background onClick={onCloseRequest} />
            <Content maxWidth={maxWidth}>{children}</Content>
        </Container>,
        document.body
    )
}

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    padding: 12px;
`

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.66);
    // backdrop-filter: blur(3px);
`

const Content = styled.div<{
    maxWidth?: number
}>`
    position: relative;
    z-index: 2;
    width: 100%;
    background: #333333;
    backdrop-filter: none;
    max-width: ${props => (props.maxWidth ? `${props.maxWidth}px` : 'none')};
    max-height: 100%;
    overflow-y: scroll;
    box-shadow: 0 0 0 5px rgba(0, 0, 0, 1);
`

export const ModalTitle = styled.h2`
    margin: 0;
    padding: 9px 12px;
    border-bottom: 1px solid #555555;
    font-size: 16px;
    display: flex;
    align-items: center;

    svg {
        color: pink;
        margin-right: 12px;
    }
`
