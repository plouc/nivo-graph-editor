import { PropertyService } from '../../services_registry'
import { MatrixPropertyOptions, MatrixProperty } from './types'
import { MatrixPropertyControl } from './MatrixPropertyControl'

export const MatrixPropertyService: PropertyService<
    'property:matrix',
    MatrixPropertyOptions,
    MatrixProperty,
    number[][]
> = {
    type: 'property:matrix',
    factory: ({ name, defaultValue = [], hasOutput = false }: MatrixPropertyOptions) => {
        return {
            name,
            type: 'property:matrix',
            value: defaultValue,
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
            value: data,
        }
    },
    getValue: data => {
        return data.value
    },
    control: MatrixPropertyControl,
}
