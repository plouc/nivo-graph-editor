import { PropertyService } from '../../../services_registry'
import { MatrixPropertyControl } from './MatrixPropertyControl'

export const MatrixPropertyService: PropertyService<
    'property:matrix',
    number[][],
    never,
    number[][]
> = {
    type: 'property:matrix',
    create: spec => ({
        ...spec,
        data: spec.data || [],
    }),
    getValue: property => property.data,
    serialize: property => property.data,
    hydrate: (property, serialized) => ({
        ...property,
        data: serialized,
    }),
    control: MatrixPropertyControl,
}
