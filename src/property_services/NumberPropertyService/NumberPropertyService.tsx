import { PropertyService } from '../../services_registry'
import { NumberPropertyOptions, NumberProperty } from './types'
import { NumberPropertyControl } from './NumberPropertyControl'

export const NumberPropertyService: PropertyService<
    'number',
    NumberPropertyOptions,
    NumberProperty,
    number
> = {
    type: 'number',
    factory: ({
        name,
        defaultValue = 0,
        hasInput = false,
        hasOutput = false,
        options: partialOptions = {},
    }: NumberPropertyOptions) => {
        const options = {
            controlType: partialOptions.controlType || 'number',
            min: partialOptions.min !== undefined ? partialOptions.min : undefined,
            max: partialOptions.max !== undefined ? partialOptions.max : undefined,
            step: partialOptions.step || 1,
        }

        return {
            name,
            type: 'number',
            value: defaultValue,
            hasInput,
            hasOutput,
            options,
        }
    },
    serialize: property => {
        // @ts-ignore
        return property.value
    },
    hydrate: (property, data) => {
        return {
            ...property,
            value: data,
        }
    },
    getValue: (property: any, registry) => {
        return registry.resolvePropertyValue(property, property.value)
    },
    control: NumberPropertyControl,
}
