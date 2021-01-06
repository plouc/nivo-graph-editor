import { ChangeEvent } from 'react'
import styled from 'styled-components'
import { FiPlus } from 'react-icons/fi'
import { FaArrowRight } from 'react-icons/fa'
import { Property, useStore } from '../../../store'
import { ArrayValueLinkPropertyType } from './ArrayValueLinkPropertyService'
import { Input } from '../../../components/ui'

export const ArrayValueLinkPropertyControl = ({
    property,
}: {
    property: Property<
        ArrayValueLinkPropertyType,
        {
            source: string
            target: string
            value: number
        }[]
    >
}) => {
    const { updateProperty } = useStore()

    const handleChange = (
        itemIndex: number,
        key: 'source' | 'target' | 'value',
        event: ChangeEvent<HTMLInputElement>
    ) => {
        updateProperty(property.id, {
            data: property.data.map((item, index) => {
                if (index !== itemIndex) {
                    return item
                }

                let value: string | number = event.target.value
                if (key === 'value') {
                    value = Number(value)
                }

                return {
                    ...item,
                    [key]: value,
                }
            }),
        })
    }

    const handleAdd = () => {
        updateProperty(property.id, {
            data: [
                ...property.data,
                {
                    source: '',
                    target: '',
                    value: 0,
                },
            ],
        })
    }

    return (
        <>
            {property.data.map((item, index) => {
                return (
                    <ControlGroup key={index}>
                        <Input
                            type="text"
                            placeholder="source"
                            value={item.source}
                            onChange={event => handleChange(index, 'source', event)}
                        />
                        <ToIcon>
                            <FaArrowRight />
                        </ToIcon>
                        <Input
                            type="text"
                            placeholder="target"
                            value={item.target}
                            onChange={event => handleChange(index, 'target', event)}
                        />
                        <Input
                            type="number"
                            value={item.value}
                            onChange={event => handleChange(index, 'value', event)}
                        />
                    </ControlGroup>
                )
            })}
            <ControlAddItemButton onClick={handleAdd}>
                <FiPlus /> Add item
            </ControlAddItemButton>
        </>
    )
}

const ControlGroup = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) 40px minmax(0, 1fr);
    grid-row-gap: 4px;
    font-size: 12px;
    align-items: center;
    margin-bottom: 9px;

    input[type='number'] {
        width: 60px;
    }
`

const ToIcon = styled.span`
    display: flex;
    justify-content: center;
`

const ControlAddItemButton = styled.div`
    grid-column-start: 1;
    grid-column-end: 3;
    display: flex;
    align-items: center;
    cursor: pointer;

    svg {
        margin-right: 9px;
    }
`
