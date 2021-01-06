import { useCallback, useState, memo } from 'react'
import { MdNoteAdd } from 'react-icons/md'
import { useLoadGraph } from '../store'
import { ConfirmButtons } from './ui/ConfirmButtons'
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
                    <ConfirmButtons
                        onConfirm={handleNewGraph}
                        onCancel={() => {
                            setIsOpen(false)
                        }}
                    />
                </Modal>
            )}
        </>
    )
})
