import { ScatterPlot } from '@nivo/scatterplot'
import { NodeService } from '../services_registry'

export interface ScatterPlotNodeData {
    data?: any
    width: number
    height: number
    margin?: any
    colors?: any
    borderColor?: any
    axisTop?: any
    axisRight?: any
    axisBottom?: any
    axisLeft?: any
}

export const ScatterPlotNodeService: NodeService<'node:scatterplot', ScatterPlotNodeData> = {
    type: 'node:scatterplot',
    category: 'charts',
    description: `A ScatterPlot chart from @nivo/scatterplot package.`,
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
            name: 'margin',
            accepts: ['node:margin'],
        },
        {
            type: 'property:ref',
            name: 'theme',
            accepts: ['node:nivo_theme'],
        },
        {
            type: 'property:ref',
            name: 'colors',
            accepts: ['node:color_scheme'],
        },
        {
            type: 'property:ref',
            name: 'borderColor',
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
                // @ts-ignore
                .getValue(property, registry)
        })

        return <ScatterPlot {...value} isInteractive={false} />
    },
}
