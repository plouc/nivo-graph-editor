import { NodeService } from '../services_registry'

export const NivoThemeNodeService: NodeService<'nivo_theme', {}> = {
    type: 'nivo_theme',
    category: 'theming',
    description: `A theme object to be used with nivo charts.`,
    hasOutput: true,
    properties: [],
    factory: () => {
        return {}
    },
    getValue: () => {
        return {
            fontFamily: `'IBM Plex Mono', monospace`,
            fontSize: 11,
            textColor: '#dddddd',
            grid: {
                line: {
                    stroke: '#333333',
                },
            },
            tooltip: {
                container: {
                    background: '#222222',
                    color: 'inherit',
                    fontSize: 'inherit',
                    borderRadius: '2px',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
                    padding: '5px 9px',
                },
            },
        }
    },
}
