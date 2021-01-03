import { ChangeEvent, Fragment } from 'react'
import styled from 'styled-components'
import { PropertyService } from '../services_registry'
import { Property, useStore } from '../state'

export type MatrixPropertyOptions = {
    name: string
    defaultValue?: number[][]
    hasInput?: boolean
    hasOutput?: boolean
}

export type MatrixProperty = {
    value: number[][]
}

const MatrixPropertyControl = ({ property }: { property: Property & MatrixProperty }) => {
    const { updateProperty } = useStore()

    const value = property.value

    let xSize = 0
    let ySize = 0
    if (value.length > 0) {
        ySize = value.length
        if (Array.isArray(value[0])) {
            xSize = value[0].length
        }
    }

    const setValue = (valueUpdate: number[][]) => {
        updateProperty(property.id, {
            value: valueUpdate,
        })
    }

    const handleSizeChange = (newXSize: number, newYSize: number) => {
        let newValue = value.slice(0, newYSize)
        for (let newRowIndex = 0; newRowIndex < newYSize - ySize; newRowIndex++) {
            newValue.push(Array.from({ length: newXSize }).fill(0) as number[])
        }
        newValue = newValue.map(row => {
            const newRow = row.slice(0, newXSize)
            for (let newColumnIndex = 0; newColumnIndex < newXSize - xSize; newColumnIndex++) {
                newRow.push(0)
            }

            return newRow
        })

        setValue(newValue)
    }

    const handleValueChange = (
        targetRowIndex: number,
        targetColumnIndex: number,
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setValue(
            value.map((row, rowIndex) => {
                if (targetRowIndex !== rowIndex) {
                    return row
                }

                return row.map((cell, columnIndex) => {
                    if (targetColumnIndex !== columnIndex) {
                        return cell
                    }

                    return Number(event.target.value)
                })
            })
        )
    }

    return (
        <div>
            <div>
                x size
                <input
                    type="number"
                    value={xSize}
                    onChange={event => handleSizeChange(Number(event.target.value), ySize)}
                />
                y size
                <input
                    type="number"
                    value={ySize}
                    onChange={event => handleSizeChange(xSize, Number(event.target.value))}
                />
            </div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${xSize}, 1fr)`,
                }}
            >
                {value.map((row, rowIndex) => {
                    return (
                        <Fragment key={rowIndex}>
                            {row.map((cell, columnIndex) => (
                                <input
                                    key={columnIndex}
                                    type="number"
                                    value={cell}
                                    onChange={event =>
                                        handleValueChange(rowIndex, columnIndex, event)
                                    }
                                />
                            ))}
                        </Fragment>
                    )
                })}
            </div>
        </div>
    )
}

export const MatrixPropertyService: PropertyService<
    'matrix',
    MatrixPropertyOptions,
    MatrixProperty,
    number[][]
> = {
    type: 'matrix',
    factory: ({
        name,
        defaultValue = [],
        hasInput = false,
        hasOutput = false,
    }: MatrixPropertyOptions) => {
        return {
            name,
            type: 'matrix',
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
    control: MatrixPropertyControl,
}

const ControlContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 6px;

    input {
        width: 52px;
    }
`
