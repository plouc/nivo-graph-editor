import styled from 'styled-components'
import { ResolvedNode } from '../store'
import { NodeWidget } from './widgets'

export const NodesLayer = ({ nodes }: { nodes: ResolvedNode[] }) => {
    return (
        <Layer>
            {nodes.map(node => (
                <NodeWidget key={node.id} node={node} />
            ))}
        </Layer>
    )
}

const Layer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
`
