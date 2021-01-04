import styled from 'styled-components'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { examples } from '../examples'
import { useStore } from '../state'
import { useCallback } from 'react'

const ExampleItem = ({
    example,
    onLoad,
}: {
    example: {
        name: string
        data: any
    }
    onLoad: () => void
}) => {
    const { loadGraph } = useStore()

    const handleLoad = useCallback(() => {
        loadGraph(example.data)
        onLoad()
    }, [loadGraph, example.data, onLoad])

    return (
        <ExampleItemContainer onClick={handleLoad}>
            {example.name}
            <FaExternalLinkAlt />
        </ExampleItemContainer>
    )
}

const ExampleItemContainer = styled.div`
    display: flex;
    padding: 6px 9px 6px 12px;
    align-items: center;
    background-color: #000000;
    border-radius: 2px;
    color: ${props => props.theme.colors.accentColor};
    cursor: pointer;
    margin: 0 12px 9px 0;

    svg {
        margin-left: 12px;
    }

    &:hover {
        box-shadow: 0 0 0 2px pink;
    }
`

export const ExampleLoader = ({ onLoad }: { onLoad: () => void }) => {
    return (
        <Container>
            {examples.map(example => (
                <ExampleItem key={example.name} example={example} onLoad={onLoad} />
            ))}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 12px 0 3px;
`
