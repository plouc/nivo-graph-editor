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
        textLight: '#aaaaaa',
        accentColor: 'pink',
        border: '#555555',
        lightBorder: '#222222',
        nodeBorder: '#111111',
        success: '#65f7cf',
        overlay: transparentize(0.2, '#333333'),
        categories: {
            axis_grid: '#837ec4',
            charts: '#f19494',
            colors_theming: '#e37e49',
            data: '#759d61',
            dimensions: '#608cb7',
            render: '#d78080',
        },
    },
}
