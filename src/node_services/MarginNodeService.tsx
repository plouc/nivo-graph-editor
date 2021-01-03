import { NodeService } from '../services_registry'

export interface MarginNodeData {
    top: number
    right: number
    bottom: number
    left: number
}

export const MarginNodeService: NodeService<'margin', MarginNodeData> = {
    type: 'margin',
    category: 'dimensions',
    description: `Top/right/bottom/left margins for charts.`,
    hasOutput: true,
    properties: [
        {
            type: 'number',
            name: 'top',
        },
        {
            type: 'number',
            name: 'right',
        },
        {
            type: 'number',
            name: 'bottom',
        },
        {
            type: 'number',
            name: 'left',
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
    getValue: ({ properties }, registry) => {
        const value: any = {}
        properties.forEach(property => {
            value[property.name] = registry
                .getPropertyService(property.type)
                .getValue(property, registry)
        })

        return value
    },
}
