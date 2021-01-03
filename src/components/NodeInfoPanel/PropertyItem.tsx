import { createElement, useCallback } from 'react'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'

import { ElementId, ResolvedProperty, useStore } from '../../state'
import registry from '../../registry'

const Relation = ({
    ownId,
    element,
}: {
    ownId: ElementId
    element: Exclude<ResolvedProperty['input'], undefined>
}) => {
    const { setSelectedNodeIds, unlink } = useStore()

    const goToRelation = useCallback(() => {
        const nodeId = element.elementType === 'node' ? element.id : element.node.id
        setSelectedNodeIds([nodeId])
    }, [setSelectedNodeIds, element])

    const handleUnlink = useCallback(() => {
        unlink(element.id, ownId)
    }, [unlink, ownId, element.id])

    return (
        <RelationContainer>
            <RelationName onClick={goToRelation}>
                {element.elementType === 'property' && <span>{element.node.name}.</span>}
                {element.name}
            </RelationName>
            <UnlinkIcon onClick={handleUnlink}>
                <FaTimes />
            </UnlinkIcon>
        </RelationContainer>
    )
}

export const PropertyItem = ({ property }: { property: ResolvedProperty }) => {
    const propertyService = registry.getPropertyService(property.type)

    const hasInput = property.input !== undefined

    return (
        <Container>
            <PropertyHeader>
                <PropertyName>{property.name}</PropertyName>
                {hasInput && <Relation ownId={property.id} element={property.input!} />}
            </PropertyHeader>
            {!hasInput && propertyService.control && (
                <ControlContainer>
                    {createElement(propertyService.control, { property })}
                </ControlContainer>
            )}
        </Container>
    )
}

const Container = styled.div`
    padding: 9px 12px;
    border-bottom: 1px solid #333333;

    &:last-child {
        border-bottom: none;
    }
`

const PropertyHeader = styled.div`
    display: grid;
    grid-template-columns: 40% 60%;
    align-items: center;
`

const PropertyName = styled.h4`
    margin: 0;
    padding: 0;
`

const RelationContainer = styled.div`
    display: flex;
    align-items: center;
    height: 24px;
    border-radius: 2px;
    color: pink;
`

const RelationName = styled.span`
    padding: 0 6px;
    height: 100%;
    flex-grow: 1;
    line-height: 24px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: #333333;
    font-weight: 600;
    font-size: 11px;

    &:hover {
        background-color: #444444;
    }
`

const UnlinkIcon = styled.span`
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    background-color: #444444;
    border-radius: 0 2px 2px 0;
    font-size: 10px;
    cursor: pointer;

    &:hover {
        background-color: #555555;
    }
`

const ControlContainer = styled.div`
    margin-top: 6px;
`
