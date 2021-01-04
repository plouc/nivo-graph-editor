import { NodeService } from '../services_registry'

const schemeChoices = [
    { label: 'nivo', value: 'nivo' },
    { label: 'Category 10', value: 'category10' },
    { label: 'Accent', value: 'accent' },
    { label: 'Dark 2', value: 'dark2' },
    { label: 'Paired', value: 'paired' },
    { label: 'Pastel 1', value: 'pastel1' },
    { label: 'Pastel 2', value: 'pastel2' },
    { label: 'Set 1', value: 'set1' },
    { label: 'Set 2', value: 'set2' },
    { label: 'Set 3', value: 'set3' },
    { label: 'Brown - Blue Green', value: 'brown_blueGreen' },
    { label: 'Purple Red - Green', value: 'purpleRed_green' },
    { label: 'Pink - Yellow Green', value: 'pink_yellowGreen' },
    { label: 'Purple - Orange', value: 'purple_orange' },
    { label: 'Red - Blue', value: 'red_blue' },
    { label: 'Red - Grey', value: 'red_grey' },
    { label: 'Red - Yellow - Blue', value: 'red_yellow_blue' },
    { label: 'Red - Yellow - Green', value: 'red_yellow_green' },
    { label: 'Spectral', value: 'spectral' },
]

export interface ColorSchemeNodeData {
    scheme: string
}

export const ColorSchemeNodeService: NodeService<'node:color_scheme', ColorSchemeNodeData> = {
    type: 'node:color_scheme',
    category: 'colors',
    description: `A predefined color scheme to be used with nivo charts.`,
    hasOutput: true,
    properties: [
        {
            type: 'property:choices',
            name: 'scheme',
            accepts: ['node:color_scheme'],
            choices: schemeChoices,
        } as any,
    ],
    factory: (data = {}) => {
        return {
            scheme: data?.scheme ?? 'nivo',
        }
    },
    getValue: node => {
        const schemeProperty = node.properties.find(property => property.name === 'scheme') as any

        return {
            scheme: schemeProperty.value,
        }
    },
}
