import { createElement, useCallback, MouseEvent, memo } from 'react'
import styled from 'styled-components'
import { transparentize } from 'polished'
import { ResolvedNode, useStore } from '../../store'
import registry from '../../registry'
import { getCategoryColor } from '../../theming'
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
            category={nodeService.category}
            isSelected={node.isSelected}
            style={{
                transform: `translate(${node.x}px,${node.y}px)`,
                width: node.width,
            }}
        >
            <NodeHeader>
                <NodeName>{node.name}</NodeName>
                {nodeService.hasOutput && (
                    <PortWidget
                        type="source"
                        elementId={node.id}
                        x={node.x + node.width}
                        y={node.y + 12}
                        category={nodeService.category}
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
    category: string
    isSelected: boolean
}>`
    pointer-events: all;
    user-select: none;
    background-color: transparent;
    color: ${props => getCategoryColor(props.category, props.theme)};
    position: absolute;
    box-shadow: ${props =>
        props.isSelected
            ? `0 0 0 2px ${getCategoryColor(props.category, props.theme)}`
            : `0 0 0 1px ${props.theme.colors.nodeBorder}`};
    cursor: move;
    font-size: 12px;

    &:hover {
        box-shadow: ${props =>
            props.isSelected
                ? `0 0 0 2px ${getCategoryColor(props.category, props.theme)}`
                : `0 0 0 1px ${getCategoryColor(props.category, props.theme)}`};
    }
`

const NodeHeader = styled.header`
    position: relative;
    background-color: ${props => transparentize(0.15, props.theme.colors.topDepthBackground)};
    width: 100%;
    height: 24px;
    padding: 0 12px 0 9px;
`

const NodeName = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
