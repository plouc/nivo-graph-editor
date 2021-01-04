import { PropertyService } from '../../services_registry'
import { ArrayStringPropertyOptions, ArrayStringProperty } from './types'
import { ArrayStringPropertyControl } from './ArrayStringPropertyControl'

export const ArrayStringPropertyService: PropertyService<
    'property:array_string',
    ArrayStringPropertyOptions,
    ArrayStringProperty,
    string[]
> = {
    type: 'property:array_string',
    factory: ({ name, defaultValue = [], hasOutput = false }: ArrayStringPropertyOptions) => {
        return {
            name,
            type: 'property:array_string',
            value: defaultValue,
            accepts: [],
            hasOutput,
        }
    },
    serialize: property => {
        // @ts-ignore
        return property.value
    },
    hydrate: (property, data) => {
        return {
            ...property,
            value: data || [],
        }
    },
    getValue: data => {
        return data.value
    },
    control: ArrayStringPropertyControl,
}
