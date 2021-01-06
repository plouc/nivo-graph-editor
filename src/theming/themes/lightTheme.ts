import { DefaultTheme } from 'styled-components'
import { transparentize } from 'polished'

export const lightTheme: DefaultTheme = {
    colors: {
        background: '#ececec',
        mediumDepthBackground: '#f5f3f3',
        topDepthBackground: '#ffffff',
        nodeBackground: '#f2f2f2',
        badgeBackground: '#eeeeee',
        inputBackground: '#eeeeee',
        inputText: '#444444',
        text: '#333333',
        textLight: '#777777',
        accentColor: '#1a8cc3',
        border: '#dddddd',
        lightBorder: '#eeeeee',
        nodeBorder: '#cccccc',
        success: '#0ab537',
        overlay: transparentize(0.3, '#eeeeee'),
        discreteLink: '#cccccc',
        categories: {
            axis_grid: '#60399b',
            charts: '#006dcd',
            colors_theming: '#d2702d',
            data: '#3da914',
            dimensions: '#288fa5',
            render: '#c3931a',
        },
    },
}
