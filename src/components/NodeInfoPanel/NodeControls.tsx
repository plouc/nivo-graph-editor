import { memo, useCallback, useState } from 'react'
import styled from 'styled-components'
import { FiTrash2 } from 'react-icons/fi'
import { ResolvedNode, useRemoveNode } from '../../store'
import { ConfirmButtons } from '../ui/ConfirmButtons'
import { Modal, ModalTitle } from '../Modal'

export const NodeControls = memo(({ node }: { node: ResolvedNode }) => {
    const nodeId = node.id

    const removeNode = useRemoveNode()

    const [isRemoving, setIsRemoving] = useState(false)

    const initRemoval = useCallback(() => {
        setIsRemoving(true)
    }, [setIsRemoving])

    const cancelRemoval = useCallback(() => {
        setIsRemoving(false)
    }, [setIsRemoving])

    const handleRemoveNode = useCallback(() => {
        removeNode(nodeId)
    }, [removeNode, nodeId])

    return (
        <Container>
            <Control onClick={initRemoval}>
                <FiTrash2 />
            </Control>
            {isRemoving && (
                <Modal onCloseRequest={cancelRemoval} maxWidth={500}>
                    <ModalTitle>
                        <FiTrash2 /> Remove node: {node.name}?
                    </ModalTitle>
                    <ConfirmButtons onConfirm={handleRemoveNode} onCancel={cancelRemoval} />
                </Modal>
            )}
        </Container>
    )
})

const Container = styled.div`
    height: 33px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid ${props => props.theme.colors.border};
`

const Control = styled.span`
    width: 33px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-left: 1px solid ${props => props.theme.colors.lightBorder};
    font-size: 16px;

    &:hover {
        background-color: #222222;
    }
`
