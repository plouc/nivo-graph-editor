import { PropertyService } from '../services_registry'
import { ChangeEvent } from 'react'
import { Property, useStore } from '../store'
import { Input } from '../components/ui'

const TextPropertyControl = ({ property }: { property: Property<'property:text', string> }) => {
    const { updateProperty } = useStore()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateProperty(property.id, {
            value: event.target.value,
        })
    }

    return <Input type="text" value={property.data} onChange={handleChange} />
}

export const TextPropertyService: PropertyService<'property:text', string, never, string> = {
    type: 'property:text',
    create: spec => ({
        ...spec,
        data: spec.data || '',
    }),
    getValue: property => property.data,
    serialize: property => property.data,
    hydrate: (property, serialized) => ({
        ...property,
        data: serialized,
    }),
    control: TextPropertyControl,
}
