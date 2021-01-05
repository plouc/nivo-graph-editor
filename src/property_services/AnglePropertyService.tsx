import { ChangeEvent } from 'react'
import { PropertyService } from '../services_registry'
import { Input } from '../components/ui'

export const anglePropertyType = 'property:angle'
export type AnglePropertyType = typeof anglePropertyType

export const AnglePropertyService: PropertyService<AnglePropertyType, number, any, number> = {
    type: anglePropertyType,
    create: spec => ({
        ...spec,
        data: spec.data !== undefined ? spec.data : 0,
    }),
    getValue: property => property.data,
    serialize: property => property.data,
    hydrate: (property, serialized) => ({
        ...property,
        data: serialized,
    }),
    control: ({ property }) => {
        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            console.log(event.target.value)
        }

        return <Input type="number" value={property.data} onChange={handleChange} />
    },
}
