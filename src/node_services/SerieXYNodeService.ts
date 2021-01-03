import { keyBy } from 'lodash'
import { NodeService } from '../services_registry'

export interface SerieXYNodeData {
    id: string
    data: {
        x: number
        y: number
    }[]
}

export const SerieXYNodeService: NodeService<'serie_xy', SerieXYNodeData> = {
    type: 'serie_xy',
    category: 'data',
    properties: [
        {
            type: 'text',
            name: 'id',
        },
        {
            type: 'array_xy',
            name: 'data',
        },
    ],
    factory: (data = {}) => {
        return {
            id: data?.id ?? '',
            data: data?.data ?? [],
        }
    },
    getValue: ({ properties }) => {
        const propertyValues: any = keyBy(properties, 'name')

        return {
            id: propertyValues.id.value,
            data: propertyValues.data.value,
        }
    },
}
