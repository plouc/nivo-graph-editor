import { ResolvedNode } from '../state'
import { NodeWidget } from './NodeWidget'

export const NodesLayer = ({ nodes }: { nodes: ResolvedNode[] }) => {
    return (
        <div
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
            }}
        >
            {nodes.map(node => (
                <NodeWidget key={node.id} node={node} />
            ))}
        </div>
    )
}
