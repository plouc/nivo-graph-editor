import { keyBy } from 'lodash'
import { NodeService } from '../services_registry'

export interface AxisNodeData {
    tickSize: number
    tickPadding: number
    tickRotation: number
    legend?: string
    legendOffset: number
}

export const AxisNodeService: NodeService<'axis', AxisNodeData> = {
    type: 'axis',
    category: 'axis_grid',
    description: `X or Y axis to be used in various chart types.`,
    properties: [
        {
            type: 'number',
            name: 'tickSize',
            hasInput: true,
        },
        {
            type: 'number',
            name: 'tickPadding',
            hasInput: true,
        },
        {
            type: 'angle',
            name: 'tickRotation',
            hasInput: true,
        },
        {
            type: 'text',
            name: 'legend',
        },
        {
            type: 'number',
            name: 'legendOffset',
            hasInput: true,
        },
    ],
    factory: (data = {}) => {
        return {
            tickSize: data?.tickSize ?? 5,
            tickPadding: data?.tickPadding ?? 5,
            tickRotation: data?.tickRotation ?? 0,
            legend: data?.legend,
            legendOffset: data?.legendOffset ?? 0,
        }
    },
    getValue: ({ properties }) => {
        const propertyValues: any = keyBy(properties, 'name')

        const nodeValue: any = {
            tickSize: propertyValues.tickSize.value,
            tickPadding: propertyValues.tickPadding.value,
            tickRotation: propertyValues.tickRotation.value,
            legendOffset: propertyValues.legendOffset.value,
        }

        if (propertyValues.legend.value) {
            nodeValue.legend = propertyValues.legend.value
        }

        return nodeValue
    },
}
