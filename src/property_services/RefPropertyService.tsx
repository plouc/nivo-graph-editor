import { PropertyService } from '../services_registry'

export const RefPropertyService: PropertyService<'property:ref', never, never, undefined> = {
    type: 'property:ref',
    create: spec => spec,
    getValue: (property, registry) => registry.resolvePropertyValue(property, undefined),
    // refs are managed by links
    serialize: () => undefined,
    hydrate: property => property,
}
