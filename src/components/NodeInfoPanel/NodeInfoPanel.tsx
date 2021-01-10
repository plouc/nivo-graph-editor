import { createElement, memo, useCallback } from 'react'
import styled from 'styled-components'
import { MdClose } from 'react-icons/md'
import registry from '../../registry'
import { ResolvedNode, useSetSelectedNodeIds } from '../../store'
import { NodeName } from './NodeName'
import { NodeControls } from './NodeControls'
import { PropertyItem } from './PropertyItem'

export const NodeInfoPanel = memo(({ node }: { node: ResolvedNode }) => {
    const nodeService = registry.getNodeService(node.type)
    const setSelectedNodeIds = useSetSelectedNodeIds()
    // @ts-ignore
    const value: any = nodeService.getValue(node, registry)

    const handleClose = useCallback(() => {
        setSelectedNodeIds([])
    }, [setSelectedNodeIds])

    return (
        <div>
            <Header>
                <NodeName id={node.id} name={node.name} />
                <NodeTypeContainer hasIcon={!!nodeService.icon}>
                    {nodeService.icon && (
                        <NodeTypeIcon>
                            {createElement(nodeService.icon, {
                                size: 38,
                                category: nodeService.category,
                            })}
                        </NodeTypeIcon>
                    )}
                    <Id>{node.type.replace('node:', '').replace('_', ' ')}</Id>
                </NodeTypeContainer>
                <Close onClick={handleClose}>
                    <MdClose />
                </Close>
            </Header>
            <NodeControls node={node} />
            <Properties>
                {node.properties.map(property => (
                    <PropertyItem key={property.id} property={property} />
                ))}
            </Properties>
            {value !== undefined && (
                <>
                    <NodeValueTitle>Node value</NodeValueTitle>
                    {!value.$$typeof && <NodeValue>{JSON.stringify(value, null, '  ')}</NodeValue>}
                    {value.$$typeof && (
                        <NodeValue>{JSON.stringify(value.props, null, '  ')}</NodeValue>
                    )}
                </>
            )}
        </div>
    )
})

const Header = styled.header`
    padding: 9px 12px;
    border-bottom: 1px solid ${props => props.theme.colors.border};
    position: relative;
`

const Id = styled.div`
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const NodeTypeContainer = styled.div<{
    hasIcon: boolean
}>`
    position: relative;
    min-height: ${props => (props.hasIcon ? '36px' : 'auto')};
    padding-left: ${props => (props.hasIcon ? '50px' : 0)};
    display: flex;
    align-items: center;
`

const NodeTypeIcon = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Close = styled.span`
    position: absolute;
    width: 32px;
    height: 32px;
    top: 9px;
    right: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 18px;
    color: #999999;

    &:hover {
        color: #eeeeee;
    }
`

const Properties = styled.div``

const NodeValueTitle = styled.h4`
    border-top: 1px solid ${props => props.theme.colors.border};
    padding: 6px 12px;
    margin: 0;
`

const NodeValue = styled.pre`
    padding: 12px;
    font-size: 12px;
    margin: 0;
    background-color: ${props => props.theme.colors.topDepthBackground};
`
