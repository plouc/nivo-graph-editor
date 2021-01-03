import { useMemo } from 'react'
import styled from 'styled-components'
import registry from '../registry'
import { useCreateNode } from '../state'
import { NodeService } from '../services_registry'

const NodeType = ({ type, onCreate }: { type: NodeService<string, any>; onCreate: () => void }) => {
    const createNode = useCreateNode()

    return (
        <NodeTypeItem
            onClick={() => {
                createNode(type.type)
                onCreate()
            }}
        >
            <div>{type.type}</div>
            {type.description && <NodeTypeDescription>{type.description}</NodeTypeDescription>}
        </NodeTypeItem>
    )
}

const Category = ({
    category,
    onCreate,
}: {
    category: {
        category: string
        types: NodeService<string, any>[]
    }
    onCreate: () => void
}) => {
    return (
        <>
            <CategoryTitle>{category.category}</CategoryTitle>
            {category.types.map(type => (
                <NodeType key={type.type} type={type} onCreate={onCreate} />
            ))}
        </>
    )
}

export const NodeSelector = ({ onCreate }: { onCreate: () => void }) => {
    const categories = useMemo(() => registry.getNodeServiceCategories(), [])

    return (
        <Container>
            {categories.map(category => (
                <Category key={category.category} category={category} onCreate={onCreate} />
            ))}
        </Container>
    )
}

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
