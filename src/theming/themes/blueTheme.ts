import { DefaultTheme } from 'styled-components'
import { transparentize } from 'polished'

export const blueTheme: DefaultTheme = {
    colors: {
        background: '#2256ff',
        mediumDepthBackground: '#2256ff',
        topDepthBackground: '#173dba',
        nodeBackground: '#2256ff',
        badgeBackground: '#333333',
        inputBackground: '#ffffff',
        inputText: '#173dba',
        text: '#ffffff',
        textLight: '#ffffff',
        accentColor: '#ffffff',
        border: '#ffffff',
        lightBorder: 'rgba(255, 255, 255, 0.15)',
        nodeBorder: '#ffffff',
        success: '#00d919',
        overlay: transparentize(0.1, '#2256ff'),
        discreteLink: '#7287d6',
        categories: {
            axis_grid: '#ffffff',
            charts: '#ffffff',
            colors_theming: '#ffffff',
            data: '#ffffff',
            dimensions: '#ffffff',
            render: '#ffffff',
        },
    },
}
