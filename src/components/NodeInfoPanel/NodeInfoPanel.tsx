import styled from 'styled-components'
import { MdClose } from 'react-icons/md'
import registry from '../../registry'
import { ResolvedNode, useStore } from '../../state'
import { NodeName } from './NodeName'
import { PropertyItem } from './PropertyItem'
import { useCallback } from 'react'

export const NodeInfoPanel = ({ node }: { node: ResolvedNode }) => {
    const nodeService = registry.getNodeService(node.type)
    const { setSelectedNodeIds } = useStore()
    const value: any = nodeService.getValue(node, registry)

    const handleClose = useCallback(() => {
        setSelectedNodeIds([])
    }, [setSelectedNodeIds])

    return (
        <div>
            <Header>
                <NodeName node={node} />
                <Id>{node.type}</Id>
                <Close onClick={handleClose}>
                    <MdClose />
                </Close>
            </Header>
            <Properties>
                {node.properties.map(property => (
                    <PropertyItem property={property} />
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
}

const Header = styled.header`
    padding: 9px 12px;
    border-bottom: 1px solid #333;
    position: relative;
`

const Id = styled.div`
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

const Properties = styled.div`
    font-size: 12px;
    padding: 9px 12px;
`

const NodeValueTitle = styled.h4`
    border-top: 1px solid #333;
    padding: 6px 12px;
    margin: 0;
`

const NodeValue = styled.pre`
    padding: 12px;
    font-size: 12px;
    margin: 0;
    background-color: #000000;
`
