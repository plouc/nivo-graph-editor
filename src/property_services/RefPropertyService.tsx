import { PropertyService } from '../services_registry'

export type RefPropertyOptions = {
    name: string
    accepts: string[]
    hasOutput?: boolean
}

export const RefPropertyService: PropertyService<'property:ref', RefPropertyOptions, any, any> = {
    type: 'property:ref',
    factory: ({ name, hasOutput = false }: RefPropertyOptions) => {
        return {
            name,
            type: 'property:ref',
            accepts: [],
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
