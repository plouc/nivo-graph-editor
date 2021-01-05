import { NodeService } from '../../services_registry'
import registry from '../../registry'

export interface MatrixNodeData {
    data: number[][]
}

export const MatrixNodeService: NodeService<'node:matrix', MatrixNodeData> = {
    type: 'node:matrix',
    category: 'data',
    hasOutput: true,
    properties: [
        {
            name: 'matrix',
            type: 'property:matrix',
            category: 'data',
            accepts: ['property:matrix'],
        },
    ],
    factory: data => {
        return {
            data: data?.data || [],
        }
    },
    getValue: ({ properties }) => {
        return registry.resolvePropertyValues(properties).matrix || []
    },
}
