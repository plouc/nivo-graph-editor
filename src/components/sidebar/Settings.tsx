import { memo, useState } from 'react'
import styled from 'styled-components'
import { MdSettings } from 'react-icons/md'
import { themes } from '../../theming'
import { useSetSettings, useSettings } from '../../store'
import { Modal, ModalTitle } from '../Modal'
import { SidebarButton } from './SidebarButton'

export const Settings = memo(() => {
    const [isOpen, setIsOpen] = useState(false)

    const settings = useSettings()
    const setSettings = useSetSettings()

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
})

const Container = styled.div`
    padding: 12px;
    display: grid;
    grid-template-columns: 90px 1fr;
`
