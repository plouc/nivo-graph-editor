import { DefaultTheme } from 'styled-components'
import { transparentize } from 'polished'

export const lightTheme: DefaultTheme = {
    colors: {
        background: '#ececec',
        mediumDepthBackground: '#f5f3f3',
        topDepthBackground: '#ffffff',
        badgeBackground: '#eeeeee',
        inputBackground: '#eeeeee',
        inputText: '#444444',
        text: '#333333',
        accentColor: '#1a8cc3',
        border: '#dddddd',
        lightBorder: '#eeeeee',
        nodeBorder: '#cccccc',
        success: '#0ab537',
        overlay: transparentize(0.3, '#eeeeee'),
    },
}
