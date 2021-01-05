import { ChangeEvent } from 'react'
import { PropertyService } from '../../services_registry'
import { useStore, Property } from '../../store'

export type ChoicePropertyOptions = {
    choices: {
        label: string
        value: string | number
    }[]
}

export const ChoicesPropertyControl = ({
    property,
}: {
    property: Property<'property:choices', string, ChoicePropertyOptions>
}) => {
    const { updateProperty } = useStore()

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        updateProperty(property.id, {
            data: event.target.value,
        })
    }

    return (
        <select value={property.data} onChange={handleChange}>
            {property.options.choices.map(choice => {
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
    string,
    ChoicePropertyOptions,
    string
> = {
    type: 'property:choices',
    create: spec => ({
        ...spec,
        data: '',
        options: spec.options || {
            choices: [],
        },
    }),
    getValue: property => property.data,
    serialize: property => property.data,
    hydrate: (property, serialized) => ({
        ...property,
        data: serialized,
    }),
    control: ChoicesPropertyControl,
}
