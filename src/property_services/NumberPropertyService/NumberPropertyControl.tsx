import { ChangeEvent } from 'react'
import { Property, useStore } from '../../state'
import { Input } from '../../components/ui'
import { NumberProperty, NumberPropertyOptions } from './types'

export const NumberPropertyControl = ({ property }: { property: Property & NumberProperty }) => {
    const { updateProperty } = useStore()

    const options: NumberPropertyOptions['options'] = (property as any).options

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateProperty(property.id, {
            value: Number(event.target.value),
        })
    }

    if (options!.controlType === 'number') {
        return (
            <Input
                type="number"
                value={property.value}
                onChange={handleChange}
                min={options!.min}
                max={options!.max}
                step={options!.step}
            />
        )
    }

    return (
        <Input
            type="range"
            value={property.value}
            onChange={handleChange}
            min={options!.min}
            max={options!.max}
            step={options!.step}
        />
    )
}
