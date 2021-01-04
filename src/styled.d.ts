import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            background: string
            mediumDepthBackground: string
            topDepthBackground: string
            badgeBackground: string
            inputBackground: string
            inputText: string
            text: string
            accentColor: string
            border: string
            lightBorder: string
            nodeBorder: string
            success: string
            overlay: string
        }
    }
}
