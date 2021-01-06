import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            background: string
            mediumDepthBackground: string
            topDepthBackground: string
            nodeBackground: string
            badgeBackground: string
            inputBackground: string
            inputText: string
            text: string
            textLight: string
            accentColor: string
            border: string
            lightBorder: string
            nodeBorder: string
            success: string
            overlay: string
            discreteLink: string
            categories: {
                axis_grid: string
                charts: string
                colors_theming: string
                data: string
                dimensions: string
                render: string
            }
        }
    }
}
