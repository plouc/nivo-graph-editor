import { useCallback, useState, memo } from 'react'
import styled from 'styled-components'
import { MdNoteAdd } from 'react-icons/md'
import { useLoadGraph } from '../store'
import { Modal, ModalTitle } from './Modal'
import { SidebarButton } from './SidebarButton'

export const NewGraph = memo(() => {
    const [isOpen, setIsOpen] = useState(false)
    const loadGraph = useLoadGraph()

    const handleNewGraph = useCallback(() => {
        loadGraph({ nodes: [], links: [] })
        setIsOpen(false)
    }, [loadGraph, setIsOpen])

    return (
        <>
            <SidebarButton
                onClick={() => {
                    setIsOpen(true)
                }}
            >
                <MdNoteAdd />
            </SidebarButton>
            {isOpen && (
                <Modal
                    onCloseRequest={() => {
                        setIsOpen(false)
                    }}
                    maxWidth={300}
                >
                    <ModalTitle>
                        <MdNoteAdd /> Create new graph?
                    </ModalTitle>
                    <ConfirmContainer>
                        <Button onClick={handleNewGraph}>yes</Button>
                        <Button
                            onClick={() => {
                                setIsOpen(false)
                            }}
                        >
                            no
                        </Button>
                    </ConfirmContainer>
                </Modal>
            )}
        </>
    )
})

const ConfirmContainer = styled.div`
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
