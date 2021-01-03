import { ChangeEvent } from 'react'
import { PropertyService } from '../services_registry'
import { Property, useStore } from '../state'
import { Input } from '../components/ui'

export type NumberPropertyOptions = {
    name: string
    defaultValue?: number
    hasInput?: boolean
    hasOutput?: boolean
}

export type NumberProperty = {
    value: number
}

const NumberPropertyControl = ({ property }: { property: Property & NumberProperty }) => {
    const { updateProperty } = useStore()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateProperty(property.id, {
            value: Number(event.target.value),
        })
    }

    return <Input type="number" value={property.value} onChange={handleChange} />
}

export const NumberPropertyService: PropertyService<
    'number',
    NumberPropertyOptions,
    NumberProperty,
    number
> = {
    type: 'number',
    factory: ({
        name,
        defaultValue = 0,
        hasInput = false,
        hasOutput = false,
    }: NumberPropertyOptions) => {
        return {
            name,
            type: 'number',
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
    getValue: (property: any, registry) => {
        return registry.resolvePropertyValue(property, property.value)
    },
    control: NumberPropertyControl,
}
