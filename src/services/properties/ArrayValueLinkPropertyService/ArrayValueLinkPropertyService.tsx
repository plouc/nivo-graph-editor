import { PropertyService } from '../../../services_registry'
import registry from '../../../registry'
import { ArrayValueLinkPropertyControl } from './ArrayValueLinkPropertyControl'

export const arrayValueLinkPropertyType = 'property:array_value_link'
export type ArrayValueLinkPropertyType = typeof arrayValueLinkPropertyType

export const ArrayValueLinkPropertyService: PropertyService<
    ArrayValueLinkPropertyType,
    {
        source: string
        target: string
        value: number
    }[],
    {},
    {
        source: string
        target: string
        value: number
    }[]
> = {
    type: arrayValueLinkPropertyType,
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
    control: ArrayValueLinkPropertyControl,
}
