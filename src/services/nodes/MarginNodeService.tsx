import { NodeService } from '../../services_registry'
import registry from '../../registry'

export interface MarginNodeData {
    top: number
    right: number
    bottom: number
    left: number
}

export const MarginNodeService: NodeService<'node:margin', MarginNodeData> = {
    type: 'node:margin',
    category: 'dimensions',
    description: `Top/right/bottom/left margins for charts.`,
    hasOutput: true,
    properties: [
        {
            type: 'property:number',
            category: 'dimensions',
            name: 'top',
            accepts: ['property:number'],
            hasOutput: true,
        },
        {
            type: 'property:number',
            category: 'dimensions',
            name: 'right',
            accepts: ['property:number'],
            hasOutput: true,
        },
        {
            type: 'property:number',
            category: 'dimensions',
            name: 'bottom',
            accepts: ['property:number'],
            hasOutput: true,
        },
        {
            type: 'property:number',
            category: 'dimensions',
            name: 'left',
            accepts: ['property:number'],
            hasOutput: true,
        },
    ],
    factory: (data = {}) => {
        return {
            top: data?.top ?? 0,
            right: data?.right ?? 0,
            bottom: data?.bottom ?? 0,
            left: data?.left ?? 0,
        }
    },
    getValue: ({ properties }) => {
        return registry.resolvePropertyValues(properties)
    },
}
