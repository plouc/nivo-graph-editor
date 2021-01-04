import { PropertyService } from '../services_registry'
import { useStore, Property } from '../state'
import { ChangeEvent } from 'react'

export type ChoiceProperty = {
    choices: {
        label: string
        value: string | number
    }[]
    value: string | number
}

export type ChoicesPropertyOptions = {
    name: string
    defaultValue?: ChoiceProperty['value']
    choices: ChoiceProperty['choices']
    hasOutput?: boolean
}

export const ChoicesPropertyControl = ({ property }: { property: Property & ChoiceProperty }) => {
    const { updateProperty } = useStore()

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        updateProperty(property.id, {
            value: event.target.value,
        })
    }

    return (
        <select value={property.value} onChange={handleChange}>
            {property.choices.map(choice => {
                return (
                    <option key={choice.value} value={choice.value}>
                        {choice.label}
                    </option>
                )
            })}
        </select>
    )
}

export const ChoicesPropertyService: PropertyService<
    'property:choices',
    ChoicesPropertyOptions,
    ChoiceProperty,
    string | number
> = {
    type: 'property:choices',
    factory: ({ name, choices, defaultValue, hasOutput = false }: ChoicesPropertyOptions) => {
        return {
            name,
            type: 'property:choices',
            choices,
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
    control: ChoicesPropertyControl,
}
