import { useState } from 'react'
import styled from 'styled-components'
import { MdLibraryAdd } from 'react-icons/md'
import { Modal } from './Modal'
import { SidebarButton } from './SidebarButton'
import { NodeSelector } from './NodeSelector'

export const AddNodeButton = () => {
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
                    <Title>
                        <MdLibraryAdd /> Add new node
                    </Title>
                    <NodeSelector
                        onCreate={() => {
                            setIsOpen(false)
                        }}
                    />
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
