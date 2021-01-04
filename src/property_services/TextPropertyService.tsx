import { PropertyService } from '../services_registry'
import { ChangeEvent } from 'react'
import { Property, useStore } from '../state'
import { Input } from '../components/ui'

export type TextPropertyOptions = {
    name: string
    defaultValue?: string
    hasOutput?: boolean
}

export type TextProperty = {
    value: string
}

const TextPropertyControl = ({ property }: { property: Property & TextProperty }) => {
    const { updateProperty } = useStore()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateProperty(property.id, {
            value: event.target.value,
        })
    }

    return <Input type="text" value={property.value} onChange={handleChange} />
}

export const TextPropertyService: PropertyService<
    'property:text',
    TextPropertyOptions,
    TextProperty,
    string
> = {
    type: 'property:text',
    factory: ({ name, defaultValue = '', hasOutput = false }: TextPropertyOptions) => {
        return {
            name,
            type: 'property:text',
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
    control: TextPropertyControl,
}
