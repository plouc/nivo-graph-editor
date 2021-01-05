import { ScatterPlot } from '@nivo/scatterplot'
import { NodeService } from '../../services_registry'
import registry from '../../registry'

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
            name: 'data',
            type: 'property:ref',
            category: 'data',
            accepts: ['node:series_xy'],
        },
        {
            type: 'property:number',
            name: 'width',
            category: 'dimensions',
            accepts: ['property:number'],
            hasOutput: true,
        },
        {
            type: 'property:number',
            name: 'height',
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
            name: 'borderColor',
            type: 'property:ref',
            category: 'colors_theming',
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

        return <ScatterPlot {...props} isInteractive={false} />
    },
}
