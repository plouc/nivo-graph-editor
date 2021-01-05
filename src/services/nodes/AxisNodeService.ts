import { NodeService } from '../../services_registry'
import registry from '../../registry'

export type AxisNodeType = 'node:axis'

export interface AxisNodeData {
    tickSize: number
    tickPadding: number
    tickRotation: number
    legend?: string
    legendOffset: number
}

export const AxisNodeService: NodeService<AxisNodeType, AxisNodeData> = {
    type: 'node:axis',
    category: 'axis_grid',
    description: `X or Y axis to be used in various chart types.`,
    hasOutput: true,
    properties: [
        {
            type: 'property:number',
            name: 'tickSize',
            accepts: ['property:number'],
        },
        {
            type: 'property:number',
            name: 'tickPadding',
            accepts: ['property:number'],
        },
        {
            type: 'property:angle',
            name: 'tickRotation',
            accepts: ['property:angle'],
        },
        {
            type: 'property:text',
            name: 'legend',
            accepts: ['property:text'],
        },
        {
            type: 'property:number',
            name: 'legendOffset',
            accepts: ['property:number'],
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
        return registry.resolvePropertyValues(properties)
    },
}
