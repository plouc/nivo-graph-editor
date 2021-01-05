import { useState } from 'react'
import styled from 'styled-components'
import { MdSettings } from 'react-icons/md'
import { themes } from '../theming'
import { SidebarButton } from './SidebarButton'
import { Modal, ModalTitle } from './Modal'
import { useStore } from '../store'

export const Settings = () => {
    const [isOpen, setIsOpen] = useState(false)

    const { settings, setSettings } = useStore()

    return (
        <>
            <SidebarButton
                onClick={() => {
                    setIsOpen(true)
                }}
            >
                <MdSettings />
            </SidebarButton>
            {isOpen && (
                <Modal
                    onCloseRequest={() => {
                        setIsOpen(false)
                    }}
                    maxWidth={500}
                >
                    <ModalTitle>
                        <MdSettings /> Settings
                    </ModalTitle>
                    <Container>
                        <span>Theme</span>
                        <select
                            value={settings.themeId}
                            onChange={event => {
                                setSettings({
                                    themeId: event.target.value,
                                })
                            }}
                        >
                            {themes.map(theme => {
                                return (
                                    <option key={theme.id} value={theme.id}>
                                        {theme.name}
                                    </option>
                                )
                            })}
                        </select>
                    </Container>
                </Modal>
            )}
        </>
    )
}

const Container = styled.div`
    padding: 12px;
    display: grid;
    grid-template-columns: 90px 1fr;
`
