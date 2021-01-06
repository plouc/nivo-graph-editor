import styled from 'styled-components'
import { ReactNode } from 'react'

export const ConfirmButtons = ({
    confirmLabel = 'yes',
    onConfirm,
    cancelLabel = 'no',
    onCancel,
}: {
    confirmLabel?: ReactNode
    onConfirm: () => void
    cancelLabel?: ReactNode
    onCancel: () => void
}) => {
    return (
        <Container>
            <Button onClick={onConfirm}>{confirmLabel}</Button>
            <Button onClick={onCancel}>{cancelLabel}</Button>
        </Container>
    )
}

const Container = styled.div`
    padding: 16px;
    display: flex;
    justify-content: center;
`

const Button = styled.span`
    padding: 9px 12px;
    background-color: #000000;
    border-radius: 2px;
    margin-left: 12px;
    cursor: pointer;
    width: 80px;
    text-align: center;

    &:first-child {
        margin-left: 0;
    }
`
