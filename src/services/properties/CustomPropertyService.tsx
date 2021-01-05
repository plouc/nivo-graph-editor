import { PropertyService } from '../../services_registry'
import { createElement } from 'react'

export type CustomPropertyOptions = {
    renderer: any
}

export const CustomPropertyService: PropertyService<
    'property:custom',
    undefined,
    CustomPropertyOptions,
    undefined
> = {
    type: 'property:custom',
    create: spec => spec,
    getValue: () => undefined,
    serialize: () => undefined,
    hydrate: property => property,
    widget: ({ property }) => createElement(property.options.renderer, { property }),
}
