import { ChangeEvent } from 'react'
import { Property, useStore } from '../../store'
import { Input } from '../../components/ui'
import { NumberPropertyOptions } from './types'

export const NumberPropertyControl = ({
    property,
}: {
    property: Property<'property:number', number, NumberPropertyOptions>
}) => {
    const { updateProperty } = useStore()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateProperty(property.id, {
            data: Number(event.target.value),
        })
    }

    if (property.options.controlType === 'number') {
        return (
            <Input
                type="number"
                value={property.data}
                onChange={handleChange}
                min={property.options.min}
                max={property.options.max}
                step={property.options.step}
            />
        )
    }

    return (
        <Input
            type="range"
            value={property.data}
            onChange={handleChange}
            min={property.options.min}
            max={property.options.max}
            step={property.options.step}
        />
    )
}
