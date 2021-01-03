import { useState, memo } from 'react'
import { MdLibraryAdd } from 'react-icons/md'
import { Modal, ModalTitle } from './Modal'
import { SidebarButton } from './SidebarButton'
import { NodeSelector } from './NodeSelector'

export const AddNodeButton = memo(() => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <SidebarButton
                onClick={() => {
                    setIsOpen(true)
                }}
            >
                <MdLibraryAdd />
            </SidebarButton>
            {isOpen && (
                <Modal
                    onCloseRequest={() => {
                        setIsOpen(false)
                    }}
                    maxWidth={600}
                >
                    <ModalTitle>
                        <MdLibraryAdd /> Add new node
                    </ModalTitle>
                    <NodeSelector
                        onCreate={() => {
                            setIsOpen(false)
                        }}
                    />
                </Modal>
            )}
        </>
    )
})
