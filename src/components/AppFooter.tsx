import { memo, useCallback } from 'react'
import styled from 'styled-components'
import { useSettings, useSetSettings } from '../store'

export const AppFooter = memo(() => {
    const settings = useSettings()
    const setSettings = useSetSettings()

    const { discreteLinks } = settings
    const toggleDiscreteLinks = useCallback(
        () =>
            setSettings({
                discreteLinks: !discreteLinks,
            }),
        [setSettings, discreteLinks]
    )

    return (
        <Container>
            <SettingItem onClick={toggleDiscreteLinks}>
                <span>discrete links</span>
                <SettingItemButton>{discreteLinks ? 'on' : 'off'}</SettingItemButton>
            </SettingItem>
        </Container>
    )
})

const Container = styled.footer`
    position: fixed;
    display: flex;
    align-items: center;
    left: 64px;
    bottom: 0;
    width: calc(100% - 364px);
    height: 36px;
    background-color: ${props => props.theme.colors.mediumDepthBackground};
`

const SettingItem = styled.div`
    user-select: none;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 12px;
    font-size: 11px;
    color: ${props => props.theme.colors.textLight};
    border-right: 1px solid ${props => props.theme.colors.lightBorder};
    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme.colors.topDepthBackground};
        color: ${props => props.theme.colors.text};
    }
`

const SettingItemButton = styled.span`
    padding: 3px 0;
    display: flex;
    justify-content: center;
    width: 32px;
    margin-left: 6px;
    background-color: ${props => props.theme.colors.topDepthBackground};
    border-radius: 2px;
    font-weight: 600;
`
