import { createElement, useCallback, MouseEvent, memo } from 'react'
import styled from 'styled-components'
import { transparentize } from 'polished'
import { ResolvedNode, useStore } from '../store'
import registry from '../registry'
import { PropertiesWidget } from './PropertiesWidget'
import { PortWidget } from './PortWidget'

export const NodeWidget = memo(({ node }: { node: ResolvedNode }) => {
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
                {nodeService.hasOutput && (
                    <PortWidget
                        type="source"
                        elementId={node.id}
                        x={node.x + node.width}
                        y={node.y + 12}
                    />
                )}
            </NodeHeader>
            {!hasCustomWidget && <PropertiesWidget properties={node.properties} />}
            {/* @ts-ignore */}
            {hasCustomWidget && createElement(nodeService.widget!, { node, registry })}
        </NodeContainer>
    )
})

const NodeContainer = styled.div<{
    isSelected: boolean
}>`
    pointer-events: all;
    user-select: none;
    background-color: transparent;
    color: ${props => props.theme.colors.accentColor};
    position: absolute;
    box-shadow: ${props =>
        props.isSelected
            ? `0 0 0 2px ${props.theme.colors.accentColor}`
            : `0 0 0 1px ${props.theme.colors.nodeBorder}`};
    cursor: move;
    font-size: 12px;

    &:hover {
        box-shadow: ${props =>
            props.isSelected
                ? `0 0 0 2px ${props.theme.colors.accentColor}`
                : `0 0 0 1px ${props.theme.colors.accentColor}`};
    }
`

const NodeHeader = styled.header`
    position: relative;
    font-weight: 600;
    background-color: ${props => transparentize(0.15, props.theme.colors.topDepthBackground)};
    display: flex;
    align-items: center;
    height: 24px;
    padding: 0 12px;

    span {
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`
