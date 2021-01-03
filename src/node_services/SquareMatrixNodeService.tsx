import { NodeService } from '../services_registry'

export interface SquareMatrixNodeData {
    data: number[][]
}

export const SquareMatrixNodeService: NodeService<'square_matrix', SquareMatrixNodeData> = {
    type: 'square_matrix',
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
