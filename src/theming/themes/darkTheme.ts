import { DefaultTheme } from 'styled-components'
import { transparentize } from 'polished'

export const darkTheme: DefaultTheme = {
    colors: {
        background: '#292929',
        mediumDepthBackground: '#111111',
        topDepthBackground: '#000000',
        nodeBackground: '#202020',
        badgeBackground: '#333333',
        inputBackground: '#333333',
        inputText: '#eeeeee',
        text: '#eeeeee',
        accentColor: 'pink',
        border: '#555555',
        lightBorder: '#333333',
        nodeBorder: '#111111',
        success: '#65f7cf',
        overlay: transparentize(0.2, '#333333'),
    },
}
