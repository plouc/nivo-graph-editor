import { useMemo } from 'react'
import registry from '../registry'
import { useStore } from '../state'
import styled from 'styled-components'

const Container = styled.div`
    max-height: 600px;
    overflow-y: auto;
`

const CategoryTitle = styled.h3`
    padding: 9px 12px;
    margin: 0;
    background-color: #222222;
    font-size: 16px;
    color: pink;
`

const NodeTypeItem = styled.div`
    padding: 12px 12px;
    border-bottom: 1px solid #444444;
    font-size: 14px;
    cursor: pointer;
    font-weight: 600;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: #444444;
    }
`

const NodeTypeDescription = styled.div`
    font-weight: 400;
    font-size: 12px;
    margin-top: 6px;
    color: #aaaaaa;
`

export const NodeSelector = ({ onCreate }: { onCreate: () => void }) => {
    const categories = useMemo(() => registry.getNodeServiceCategories(), [])

    const { createNode } = useStore()

    return (
        <Container>
            {categories.map(category => {
                return (
                    <div key={category.category}>
                        <CategoryTitle>{category.category}</CategoryTitle>
                        {category.types.map(type => {
                            return (
                                <NodeTypeItem
                                    key={type.type}
                                    onClick={() => {
                                        createNode(type.type)
                                        onCreate()
                                    }}
                                >
                                    <div>{type.type}</div>
                                    {type.description && (
                                        <NodeTypeDescription>
                                            {type.description}
                                        </NodeTypeDescription>
                                    )}
                                </NodeTypeItem>
                            )
                        })}
                    </div>
                )
            })}
        </Container>
    )
}
