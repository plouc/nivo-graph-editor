import { Sankey } from '@nivo/sankey'
import { NodeService } from '../../../services_registry'
import registry from '../../../registry'
import { SankeyNodeIcon } from './SankeyNodeIcon'

export const sankeyNodeType = 'node:sankey' as const
export type SankeyNodeType = typeof sankeyNodeType

export interface SankeyNodeData {
    data?: any
    width: number
    height: number
    margin?: number
    layout?: 'vertical' | 'horizontal'
    align?: 'center' | 'justify' | 'start' | 'end'
    colors?: any
    axisTop?: any
    axisRight?: any
    axisBottom?: any
    axisLeft?: any
}

export const SankeyNodeService: NodeService<SankeyNodeType, SankeyNodeData> = {
    type: sankeyNodeType,
    description: `A Sankey diagram from @nivo/sankey package.`,
    category: 'charts',
    icon: SankeyNodeIcon,
    hasOutput: true,
    properties: [
        {
            name: 'data',
            type: 'property:ref',
            category: 'data',
            accepts: ['node:sankey_data'],
        },
        {
            name: 'width',
            type: 'property:number',
            category: 'dimensions',
            accepts: ['property:number'],
            hasOutput: true,
        },
        {
            name: 'height',
            type: 'property:number',
            category: 'dimensions',
            accepts: ['property:number'],
            hasOutput: true,
        },
        {
            name: 'margin',
            type: 'property:ref',
            category: 'dimensions',
            accepts: ['node:margin'],
        },
        {
            name: 'layout',
            type: 'property:choices',
            category: 'layout',
            options: {
                choices: [
                    { label: 'Horizontal', value: 'horizontal' },
                    { label: 'Vertical', value: 'vertical' },
                ],
            },
        },
        {
            name: 'align',
            type: 'property:choices',
            category: 'layout',
            options: {
                choices: [
                    { label: 'Center', value: 'center' },
                    { label: 'Justify', value: 'justify' },
                    { label: 'Start', value: 'start' },
                    { label: 'End', value: 'end' },
                ],
            },
        },
        {
            name: 'theme',
            type: 'property:ref',
            category: 'colors_theming',
            accepts: ['node:nivo_theme'],
        },
        {
            name: 'colors',
            type: 'property:ref',
            category: 'colors_theming',
            accepts: ['node:color_scheme'],
        },
        {
            name: 'linkBlendMode',
            type: 'property:text',
            category: 'colors_theming',
        },
    ],
    factory: (data = {}) => {
        return {
            width: data?.width ?? 420,
            height: data?.height ?? 240,
            layout: data?.layout ?? 'horizontal',
            align: data?.align ?? 'justify',
        }
    },
    getValue: ({ properties }) => {
        const props = registry.resolvePropertyValues(properties)

        if (!props.data) {
            return <div />
        }

        return <Sankey {...props} />
    },
}
