import { ChangeEvent, Fragment } from 'react'
import styled from 'styled-components'
import { FiPlus } from 'react-icons/fi'
import { PropertyService } from '../services_registry'
import { Property, useStore } from '../state'

export type ArrayXYPropertyOptions = {
    name: string
    defaultValue?: {
        x: number
        y: number
    }[]
    hasInput?: boolean
    hasOutput?: boolean
}

export type ArrayXYProperty = {
    value: {
        x: number
        y: number
    }[]
}

const ControlContainer = styled.div`
    display: grid;
    grid-template-columns: 20px auto 20px auto;
    grid-row-gap: 6px;

    input {
        width: 52px;
    }
`

const ControlAddItemButton = styled.div`
    grid-column-start: 1;
    grid-column-end: 5;
    display: flex;
    align-items: center;
    cursor: pointer;

    svg {
        margin-right: 9px;
    }
`

const ArrayXYPropertyControl = ({ property }: { property: Property & ArrayXYProperty }) => {
    const { updateProperty } = useStore()

    const handleChange = (
        itemIndex: number,
        key: 'x' | 'y',
        event: ChangeEvent<HTMLInputElement>
    ) => {
        updateProperty(property.id, {
            value: property.value.map((item, index) => {
                if (index !== itemIndex) {
                    return item
                }

                return {
                    ...item,
                    [key]: Number(event.target.value),
                }
            }),
        })
    }

    const handleAdd = () => {
        updateProperty(property.id, {
            value: [
                ...property.value,
                {
                    x: 0,
                    y: 0,
                },
            ],
        })
    }

    return (
        <ControlContainer>
            {property.value.map((item, index) => {
                return (
                    <Fragment key={index}>
                        x:{' '}
                        <input
                            type="number"
                            value={item.x}
                            onChange={event => handleChange(index, 'x', event)}
                            size={4}
                        />
                        y:{' '}
                        <input
                            type="number"
                            value={item.y}
                            onChange={event => handleChange(index, 'y', event)}
                        />
                    </Fragment>
                )
            })}
            <ControlAddItemButton onClick={handleAdd}>
                <FiPlus /> Add item
            </ControlAddItemButton>
        </ControlContainer>
    )
}

export const ArrayXYPropertyService: PropertyService<
    'array_xy',
    ArrayXYPropertyOptions,
    ArrayXYProperty,
    {
        x: number
        y: number
    }[]
> = {
    type: 'array_xy',
    factory: ({
        name,
        defaultValue = [],
        hasInput = false,
        hasOutput = false,
    }: ArrayXYPropertyOptions) => {
        return {
            name,
            type: 'array_xy',
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
    getValue: data => {
        return data.value
    },
    control: ArrayXYPropertyControl,
}
