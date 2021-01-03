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

export const LineNodeService: NodeService<'line', LineNodeData> = {
    type: 'line',
    category: 'charts',
    description: `A Line chart from @nivo/line package.`,
    properties: [
        {
            type: 'ref',
            name: 'data',
            hasInput: true,
        },
        {
            type: 'number',
            name: 'width',
            hasInput: true,
            hasOutput: true,
        },
        {
            type: 'number',
            name: 'height',
            hasInput: true,
            hasOutput: true,
        },
        {
            type: 'ref',
            name: 'margin',
            hasInput: true,
        },
        {
            type: 'ref',
            name: 'theme',
            hasInput: true,
        },
        {
            type: 'ref',
            name: 'colors',
            hasInput: true,
        },
        {
            type: 'ref',
            name: 'axisTop',
            hasInput: true,
        },
        {
            type: 'ref',
            name: 'axisRight',
            hasInput: true,
        },
        {
            type: 'ref',
            name: 'axisBottom',
            hasInput: true,
        },
        {
            type: 'ref',
            name: 'axisLeft',
            hasInput: true,
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
