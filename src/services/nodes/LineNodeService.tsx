import { Line } from '@nivo/line'
import { NodeService } from '../../services_registry'
import registry from '../../registry'

export interface LineNodeData {
    data?: any
    width: number
    height: number
    margin?: number
    colors?: any
    axisTop?: any
    axisRight?: any
    axisBottom?: any
    axisLeft?: any
}

export const LineNodeService: NodeService<'node:line', LineNodeData> = {
    type: 'node:line',
    category: 'charts',
    description: `A Line chart from @nivo/line package.`,
    hasOutput: true,
    properties: [
        {
            name: 'data',
            type: 'property:ref',
            category: 'data',
            accepts: ['node:series_xy'],
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
            name: 'axisTop',
            type: 'property:ref',
            category: 'axis_grid',
            accepts: ['node:axis'],
        },
        {
            name: 'axisRight',
            type: 'property:ref',
            category: 'axis_grid',
            accepts: ['node:axis'],
        },
        {
            name: 'axisBottom',
            type: 'property:ref',
            category: 'axis_grid',
            accepts: ['node:axis'],
        },
        {
            name: 'axisLeft',
            type: 'property:ref',
            category: 'axis_grid',
            accepts: ['node:axis'],
        },
    ],
    factory: (data = {}) => {
        return {
            width: data?.width ?? 420,
            height: data?.height ?? 240,
        }
    },
    getValue: ({ properties }) => {
        const props = registry.resolvePropertyValues(properties)

        return <Line {...props} isInteractive={false} />
    },
}
