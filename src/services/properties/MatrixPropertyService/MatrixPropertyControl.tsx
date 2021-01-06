import { ChangeEvent, Fragment } from 'react'
import styled from 'styled-components'
import { Property, useStore } from '../../../store'
import { Input } from '../../../components/ui'

export const MatrixPropertyControl = ({
    property,
}: {
    property: Property<'property:matrix', number[][]>
}) => {
    const { updateProperty } = useStore()

    const value = property.data

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
            data: valueUpdate,
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
        <>
            <SizeContainer>
                x size
                <Input
                    type="number"
                    value={xSize}
                    onChange={event => handleSizeChange(Number(event.target.value), ySize)}
                />
                y size
                <Input
                    type="number"
                    value={ySize}
                    onChange={event => handleSizeChange(xSize, Number(event.target.value))}
                />
            </SizeContainer>
            <MatrixWrapper>
                <MatrixContainer columns={xSize} rows={ySize}>
                    {value.map((row, rowIndex) => {
                        return (
                            <Fragment key={rowIndex}>
                                {row.map((cell, columnIndex) => (
                                    <Input
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
                </MatrixContainer>
            </MatrixWrapper>
        </>
    )
}

const SizeContainer = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr) minmax(0, 1fr) minmax(0, 2fr);
    grid-column-gap: 9px;
    align-items: center;
    font-size: 12px;
    white-space: nowrap;
    margin-bottom: 9px;
`

const MatrixWrapper = styled.div`
    overflow-x: scroll;
`

const MatrixContainer = styled.div<{
    columns: number
    rows: number
}>`
    display: grid;
    grid-template-columns: repeat(${props => props.columns}, minmax(50px, 1fr));
    grid-template-rows: repeat(${props => props.rows}, 1fr);
    grid-column-gap: 4px;
    grid-row-gap: 4px;
`
