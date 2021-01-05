import { NodeService } from '../services_registry'

export interface MatrixNodeData {
    data: number[][]
}

export const MatrixNodeService: NodeService<'node:matrix', MatrixNodeData> = {
    type: 'node:matrix',
    category: 'data',
    hasOutput: true,
    properties: [
        {
            type: 'property:matrix',
            name: 'matrix',
            accepts: ['property:matrix'],
        },
    ],
    factory: data => {
        return {
            data: data?.data || [],
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

        return value.matrix || []
    },
}
