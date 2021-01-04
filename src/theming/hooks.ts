import { useMemo } from 'react'
import { useSettings } from '../state'
import { themes } from './themes'

export const useCurrentTheme = () => {
    const { themeId } = useSettings()

    return useMemo(() => {
        const theme = themes.find(theme => theme.id === themeId)
        if (!theme) {
            throw new Error(`no theme found matching id: ${themeId}`)
        }

        return theme.theme
    }, [themeId])
}
