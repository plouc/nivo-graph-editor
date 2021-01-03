import { ChangeEvent } from 'react'
import styled from 'styled-components'
import { FiPlus } from 'react-icons/fi'
import { PropertyService } from '../services_registry'
import { Property, useStore } from '../state'
import { Input } from '../components/ui'

export type ArrayStringPropertyOptions = {
    name: string
    defaultValue?: string[]
    hasInput?: boolean
    hasOutput?: boolean
}

export type ArrayStringProperty = {
    value: string[]
}

const ControlContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 6px;

    input {
        width: 52px;
    }
`

const ControlAddItemButton = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;

    svg {
        margin-right: 9px;
    }
`

const ArrayStringPropertyControl = ({ property }: { property: Property & ArrayStringProperty }) => {
    const { updateProperty } = useStore()

    const handleChange = (itemIndex: number, event: ChangeEvent<HTMLInputElement>) => {
        updateProperty(property.id, {
            value: property.value.map((item, index) => {
                if (index !== itemIndex) {
                    return item
                }

                return event.target.value
            }),
        })
    }

    const handleAdd = () => {
        updateProperty(property.id, {
            value: [...property.value, ''],
        })
    }

    return (
        <ControlContainer>
            {property.value.map((item, index) => {
                return (
                    <Input
                        key={index}
                        type="text"
                        value={item}
                        onChange={event => handleChange(index, event)}
                        size={4}
                    />
                )
            })}
            <ControlAddItemButton onClick={handleAdd}>
                <FiPlus /> Add item
            </ControlAddItemButton>
        </ControlContainer>
    )
}

export const ArrayStringPropertyService: PropertyService<
    'array_string',
    ArrayStringPropertyOptions,
    ArrayStringProperty,
    string[]
> = {
    type: 'array_string',
    factory: ({
        name,
        defaultValue = [],
        hasInput = false,
        hasOutput = false,
    }: ArrayStringPropertyOptions) => {
        return {
            name,
            type: 'array_string',
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
            value: data || [],
        }
    },
    getValue: data => {
        return data.value
    },
    control: ArrayStringPropertyControl,
}
