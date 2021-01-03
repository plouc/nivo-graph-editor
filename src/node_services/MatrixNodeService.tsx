import { NodeService } from '../services_registry'

export interface MatrixNodeData {
    data: number[][]
}

export const MatrixNodeService: NodeService<'matrix', MatrixNodeData> = {
    type: 'matrix',
    category: 'data',
    hasOutput: true,
    properties: [
        {
            type: 'matrix',
            name: 'matrix',
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
                .getValue(property, registry)
        })

        return value.matrix || []
    },
}
