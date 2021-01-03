import { PropertyService } from '../../services_registry'
import { ArrayStringPropertyOptions, ArrayStringProperty } from './types'
import { ArrayStringPropertyControl } from './ArrayStringPropertyControl'

export const ArrayStringPropertyService: PropertyService<
    'array_string',
    ArrayStringPropertyOptions,
    ArrayStringProperty,
    string[]
> = {
    type: 'array_string',
    factory: ({
        name,
        defaultValue = [],
        hasInput = false,
        hasOutput = false,
    }: ArrayStringPropertyOptions) => {
        return {
            name,
            type: 'array_string',
            value: defaultValue,
            hasInput,
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
