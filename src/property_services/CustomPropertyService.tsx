import { PropertyService } from '../services_registry'
import { createElement } from 'react'

export type CustomPropertyOptions = {
    name: string
    renderer: any
}

export const CustomPropertyService: PropertyService<
    'custom',
    CustomPropertyOptions,
    any,
    undefined
> = {
    type: 'custom',
    factory: ({ name, renderer }: CustomPropertyOptions) => {
        return {
            name,
            renderer,
            type: 'custom',
            hasInput: false,
            hasOutput: false,
        }
    },
    serialize: () => undefined,
    hydrate: property => property,
    getValue: () => undefined,
    widget: ({ property }) => {
        return createElement(property.renderer, { property })
    },
}
