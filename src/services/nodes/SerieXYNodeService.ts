import { NodeService } from '../../services_registry'
import registry from '../../registry'

export interface SerieXYNodeData {
    id: string
    data: {
        x: number
        y: number
    }[]
}

export const SerieXYNodeService: NodeService<'node:serie_xy', SerieXYNodeData> = {
    type: 'node:serie_xy',
    category: 'data',
    hasOutput: true,
    properties: [
        {
            name: 'id',
            type: 'property:text',
            category: 'data',
            accepts: ['property:text'],
            hasOutput: true,
        },
        {
            name: 'data',
            type: 'property:array_xy',
            category: 'data',
            accepts: ['property:array_xy'],
            hasOutput: true,
        },
    ],
    factory: (data = {}) => {
        return {
            id: data?.id ?? '',
            data: data?.data ?? [],
        }
    },
    getValue: ({ properties }) => {
        return registry.resolvePropertyValues(properties)
    },
}
