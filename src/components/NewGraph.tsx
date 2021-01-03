import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { MdNoteAdd } from 'react-icons/md'
import { useStore } from '../state'
import { Modal } from './Modal'
import { SidebarButton } from './SidebarButton'

export const NewGraph = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { loadGraph } = useStore()

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
                    <Title>
                        <MdNoteAdd /> Create new graph?
                    </Title>
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
}

const Title = styled.h2`
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
