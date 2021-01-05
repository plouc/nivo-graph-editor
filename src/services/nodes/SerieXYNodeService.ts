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
            type: 'property:text',
            name: 'id',
            accepts: ['property:text'],
        },
        {
            type: 'property:array_xy',
            name: 'data',
            accepts: ['property:array_xy'],
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
