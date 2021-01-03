import { createElement, useCallback, MouseEvent } from 'react'
import styled from 'styled-components'
import { ResolvedNode, useStore } from '../state'
import registry from '../registry'
import { PropertiesWidget } from './PropertiesWidget'
import { PortWidget } from './PortWidget'

const NodeContainer = styled.div<{
    isSelected: boolean
}>`
    user-select: none;
    background-color: transparent;
    color: pink;
    position: absolute;
    box-shadow: ${props => (props.isSelected ? '0 0 0 2px pink' : '0 0 0 1px rgba(0, 0, 0, 0.66)')};
    cursor: move;
    font-size: 12px;

    &:hover {
        box-shadow: ${props => (props.isSelected ? '0 0 0 2px pink' : '0 0 0 1px pink')};
    }
`

const NodeHeader = styled.header`
    position: relative;
    font-weight: 600;
    background-color: #000000cc;
    display: flex;
    align-items: center;
    height: 24px;
    padding: 0 12px;

    span {
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`

export const NodeWidget = ({ node }: { node: ResolvedNode }) => {
    const nodeService = registry.getNodeService(node.type)
    const hasCustomWidget = 'widget' in nodeService
    const { setSelectedNodeIds, startDrag } = useStore()

    const handleStartDrag = useCallback(
        (event: MouseEvent) => {
            setSelectedNodeIds([node.id])
            startDrag(node.id, [event.clientX, event.clientY])
        },
        [setSelectedNodeIds, node.id, startDrag]
    )

    return (
        <NodeContainer
            onMouseDown={handleStartDrag}
            isSelected={node.isSelected}
            style={{
                top: node.y,
                left: node.x,
                width: node.width,
            }}
        >
            <NodeHeader>
                <span>{node.name}</span>
                <PortWidget
                    type="source"
                    elementId={node.id}
                    position={[node.x + node.width, node.y + 12]}
                />
            </NodeHeader>
            {!hasCustomWidget && <PropertiesWidget properties={node.properties} />}
            {hasCustomWidget && createElement(nodeService.widget!, { node, registry })}
        </NodeContainer>
    )
}
