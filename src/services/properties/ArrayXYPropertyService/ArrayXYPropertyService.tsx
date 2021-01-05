import { PropertyService } from '../../../services_registry'
import registry from '../../../registry'
import { ArrayXYPropertyControl } from './ArrayXYPropertyControl'

export const arrayXYPropertyType = 'property:array_xy'
export type ArrayXYPropertyType = typeof arrayXYPropertyType

export const ArrayXYPropertyService: PropertyService<
    ArrayXYPropertyType,
    {
        x: number
        y: number
    }[],
    {},
    {
        x: number
        y: number
    }[]
> = {
    type: arrayXYPropertyType,
    create: spec => ({
        ...spec,
        data: spec.data || [],
    }),
    getValue: property => {
        return registry.resolvePropertyValue(property, property.data)
    },
    serialize: property => property.data,
    hydrate: (property, serialized) => ({
        ...property,
        data: serialized,
    }),
    control: ArrayXYPropertyControl,
}
