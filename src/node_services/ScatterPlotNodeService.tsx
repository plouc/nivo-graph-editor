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

export const ScatterPlotNodeService: NodeService<'scatterplot', ScatterPlotNodeData> = {
    type: 'scatterplot',
    category: 'charts',
    description: `A ScatterPlot chart from @nivo/scatterplot package.`,
    hasOutput: true,
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
            name: 'borderColor',
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

        return <ScatterPlot {...value} isInteractive={false} />
    },
}
