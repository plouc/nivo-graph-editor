import { PropertyService } from '../../../services_registry'
import registry from '../../../registry'
import { ArrayStringPropertyControl } from './ArrayStringPropertyControl'

export const ArrayStringPropertyService: PropertyService<
    'property:array_string',
    string[],
    never,
    string[]
> = {
    type: 'property:array_string',
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
    control: ArrayStringPropertyControl,
}
