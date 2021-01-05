import { DefaultTheme } from 'styled-components'

export const getCategoryColor = (category: string, theme: DefaultTheme) => {
    if (category in theme.colors.categories) {
        return theme.colors.categories[category as keyof DefaultTheme['colors']['categories']]
    }

    return theme.colors.accentColor
}
