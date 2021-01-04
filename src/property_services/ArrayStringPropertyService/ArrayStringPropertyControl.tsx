import { ChangeEvent, Fragment, useCallback } from 'react'
import styled from 'styled-components'
import { FiPlus } from 'react-icons/fi'
import { FaTimes } from 'react-icons/fa'
import { Property, useStore } from '../../state'
import { Input } from '../../components/ui'
import { ArrayStringProperty } from './types'

export const ArrayStringPropertyControl = ({
    property,
}: {
    property: Property & ArrayStringProperty
}) => {
    const { updateProperty } = useStore()

    const setValue = useCallback(
        (value: string[]) => {
            updateProperty(property.id, { value })
        },
        [updateProperty, property.id]
    )

    const handleChange = (itemIndex: number, event: ChangeEvent<HTMLInputElement>) => {
        setValue(
            property.value.map((item, index) => {
                if (index !== itemIndex) return item

                return event.target.value
            })
        )
    }

    const handleAdd = () => {
        setValue([...property.value, ''])
    }

    const handleRemove = (index: number) => {
        setValue(property.value.filter((_, i) => i !== index))
    }

    return (
        <>
            <Grid>
                {property.value.map((item, index) => {
                    return (
                        <Fragment key={index}>
                            <span>[{index}]</span>
                            <Input
                                type="text"
                                value={item}
                                onChange={event => handleChange(index, event)}
                                size={4}
                            />
                            <RemoveButton
                                onClick={() => {
                                    handleRemove(index)
                                }}
                            >
                                <FaTimes />
                            </RemoveButton>
                        </Fragment>
                    )
                })}
                <AddItemButton onClick={handleAdd}>
                    <FiPlus /> Add item
                </AddItemButton>
            </Grid>
        </>
    )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: 28px 1fr 20px;
    grid-column-gap: 6px;
    grid-row-gap: 6px;
    margin-bottom: 9px;
    align-items: center;
    font-size: 12px;
`

const RemoveButton = styled.span`
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    border-radius: 2px;
    cursor: pointer;
    color: #777777;

    &:hover {
        background-color: #333333;
        color: ${props => props.theme.colors.accentColor};
    }
`

const AddItemButton = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    grid-column-start: 2;

    svg {
        margin-right: 9px;
    }
`
