import { PropertyService } from '../../../services_registry'
import registry from '../../../registry'
import { NumberPropertyOptions } from './types'
import { NumberPropertyControl } from './NumberPropertyControl'

export const NumberPropertyService: PropertyService<
    'property:number',
    number,
    NumberPropertyOptions,
    number
> = {
    type: 'property:number',
    create: ({ options: partialOptions = {}, ...spec }) => {
        const options = {
            controlType: partialOptions.controlType || 'number',
            min: partialOptions.min !== undefined ? partialOptions.min : undefined,
            max: partialOptions.max !== undefined ? partialOptions.max : undefined,
            step: partialOptions.step || 1,
        }

        return {
            ...spec,
            options,
        }
    },
    getValue: property => {
        return registry.resolvePropertyValue(property, property.data)
    },
    serialize: property => property.data,
    hydrate: (property, serialized) => ({
        ...property,
        data: serialized,
    }),
    control: NumberPropertyControl,
}
