import { ChangeEvent, Fragment } from 'react'
import styled from 'styled-components'
import { FiPlus } from 'react-icons/fi'
import { Property, useStore } from '../../../store'
import { ArrayXYPropertyType } from './ArrayXYPropertyService'

export const ArrayXYPropertyControl = ({
    property,
}: {
    property: Property<
        ArrayXYPropertyType,
        {
            x: number
            y: number
        }[]
    >
}) => {
    const { updateProperty } = useStore()

    const handleChange = (
        itemIndex: number,
        key: 'x' | 'y',
        event: ChangeEvent<HTMLInputElement>
    ) => {
        updateProperty(property.id, {
            data: property.data.map((item, index) => {
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
            data: [
                ...property.data,
                {
                    x: 0,
                    y: 0,
                },
            ],
        })
    }

    return (
        <ControlContainer>
            {property.data.map((item, index) => {
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
