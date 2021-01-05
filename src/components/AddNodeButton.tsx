import { useState, memo, useCallback } from 'react'
import { MdLibraryAdd } from 'react-icons/md'
import { Modal, ModalTitle } from './Modal'
import { SidebarButton } from './SidebarButton'
import { NodeSelector } from './NodeSelector'

export const AddNodeButton = memo(() => {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = useCallback(() => {
        setIsOpen(true)
    }, [setIsOpen])

    const handleClose = useCallback(() => {
        setIsOpen(false)
    }, [setIsOpen])

    return (
        <>
            <SidebarButton onClick={handleOpen}>
                <MdLibraryAdd />
            </SidebarButton>
            {isOpen && (
                <Modal onCloseRequest={handleClose} maxWidth={600}>
                    <ModalTitle>
                        <MdLibraryAdd /> Add new node
                    </ModalTitle>
                    <NodeSelector onCreate={handleClose} />
                </Modal>
            )}
        </>
    )
})
