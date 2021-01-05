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
            name: 'tickSize',
            type: 'property:number',
            category: 'dimensions',
            accepts: ['property:number'],
            hasOutput: true,
        },
        {
            name: 'tickPadding',
            type: 'property:number',
            category: 'dimensions',
            accepts: ['property:number'],
            hasOutput: true,
        },
        {
            name: 'tickRotation',
            type: 'property:angle',
            category: 'dimensions',
            accepts: ['property:angle'],
            hasOutput: true,
        },
        {
            name: 'legend',
            type: 'property:text',
            category: 'data',
            accepts: ['property:text'],
            hasOutput: true,
        },
        {
            name: 'legendOffset',
            type: 'property:number',
            category: 'dimensions',
            accepts: ['property:number'],
            hasOutput: true,
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
