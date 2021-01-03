import { PropertyService } from '../services_registry'

export type RefPropertyOptions = {
    name: string
    hasInput?: boolean
    hasOutput?: boolean
}

export const RefPropertyService: PropertyService<'ref', RefPropertyOptions, any, any> = {
    type: 'ref',
    factory: ({ name, hasInput = false, hasOutput = false }: RefPropertyOptions) => {
        return {
            name,
            type: 'ref',
            hasInput,
            hasOutput,
        }
    },
    // refs are managed by links
    serialize: () => undefined,
    hydrate: property => property,
    getValue: (property, registry) => {
        return registry.resolvePropertyValue(property, undefined)
    },
}
