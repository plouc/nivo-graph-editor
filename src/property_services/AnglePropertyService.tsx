import { PropertyService } from '../services_registry'
import { ChangeEvent } from 'react'

export type AnglePropertyOptions = {
    name: string
    defaultValue?: number
    hasInput?: boolean
    hasOutput?: boolean
}

export type AngleProperty = {
    value: number
}

export const AnglePropertyService: PropertyService<
    'angle',
    AnglePropertyOptions,
    AngleProperty,
    number
> = {
    type: 'angle',
    factory: ({
        name,
        defaultValue,
        hasInput = false,
        hasOutput = false,
    }: AnglePropertyOptions) => {
        return {
            name,
            type: 'angle',
            value: defaultValue,
            hasInput,
            hasOutput,
        }
    },
    serialize: property => {
        // @ts-ignore
        return property.value
    },
    getValue: data => {
        return data.value
    },
    hydrate: (property, data) => {
        return {
            ...property,
            value: data,
        }
    },
    control: ({ property }) => {
        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            console.log(event.target.value)
        }

        return <input type="number" value={property.value} onChange={handleChange} />
    },
}
