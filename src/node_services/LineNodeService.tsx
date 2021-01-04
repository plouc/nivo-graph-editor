import { Line } from '@nivo/line'
import { NodeService } from '../services_registry'

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
            type: 'property:ref',
            name: 'data',
        },
        {
            type: 'property:number',
            name: 'width',
            accepts: ['property:number'],
            hasOutput: true,
        },
        {
            type: 'property:number',
            name: 'height',
            accepts: ['property:number'],
            hasOutput: true,
        },
        {
            type: 'property:ref',
            accepts: ['node:margin'],
            name: 'margin',
        },
        {
            type: 'property:ref',
            accepts: ['node:nivo_theme'],
            name: 'theme',
        },
        {
            type: 'property:ref',
            name: 'colors',
            accepts: ['node:color_scheme'],
        },
        {
            type: 'property:ref',
            name: 'axisTop',
            accepts: ['node:axis'],
        },
        {
            type: 'property:ref',
            name: 'axisRight',
            accepts: ['node:axis'],
        },
        {
            type: 'property:ref',
            name: 'axisBottom',
            accepts: ['node:axis'],
        },
        {
            type: 'property:ref',
            name: 'axisLeft',
            accepts: ['node:axis'],
        },
    ],
    factory: (data = {}) => {
        return {
            width: data?.width ?? 420,
            height: data?.height ?? 240,
        }
    },
    getValue: ({ properties }, registry) => {
        const value: any = {}
        properties.forEach(property => {
            value[property.name] = registry
                .getPropertyService(property.type)
                .getValue(property, registry)
        })

        return <Line {...value} isInteractive={false} />
    },
}
