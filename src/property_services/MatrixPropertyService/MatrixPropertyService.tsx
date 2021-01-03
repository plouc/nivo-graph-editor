import { PropertyService } from '../../services_registry'
import { MatrixPropertyOptions, MatrixProperty } from './types'
import { MatrixPropertyControl } from './MatrixPropertyControl'

export const MatrixPropertyService: PropertyService<
    'matrix',
    MatrixPropertyOptions,
    MatrixProperty,
    number[][]
> = {
    type: 'matrix',
    factory: ({
        name,
        defaultValue = [],
        hasInput = false,
        hasOutput = false,
    }: MatrixPropertyOptions) => {
        return {
            name,
            type: 'matrix',
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
            value: data,
        }
    },
    getValue: data => {
        return data.value
    },
    control: MatrixPropertyControl,
}
