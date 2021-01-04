import { createElement, useCallback, memo } from 'react'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import { ElementId, ResolvedProperty, useSetSelectedNodeIds, useUnlink } from '../../state'
import registry from '../../registry'

const Relation = memo(
    ({
        ownId,
        elementId,
        nodeId,
        name,
        parentName,
    }: {
        ownId: ElementId
        elementId: ElementId
        nodeId: ElementId
        name: string
        parentName?: string
    }) => {
        const setSelectedNodeIds = useSetSelectedNodeIds()
        const unlink = useUnlink()

        const goToRelation = useCallback(() => {
            setSelectedNodeIds([nodeId])
        }, [setSelectedNodeIds, nodeId])

        const handleUnlink = useCallback(() => {
            unlink(elementId, ownId)
        }, [unlink, ownId, elementId])

        return (
            <RelationContainer>
                <RelationName onClick={goToRelation}>
                    {parentName && <span>{parentName}.</span>}
                    {name}
                </RelationName>
                <UnlinkIcon onClick={handleUnlink}>
                    <FaTimes />
                </UnlinkIcon>
            </RelationContainer>
        )
    }
)

export const PropertyItem = memo(({ property }: { property: ResolvedProperty }) => {
    const propertyService = registry.getPropertyService(property.type)

    const hasInput = property.input !== undefined

    return (
        <Container>
            <PropertyHeader>
                <PropertyName>{property.name}</PropertyName>
                {hasInput && (
                    <Relation
                        ownId={property.id}
                        elementId={property.input!.id}
                        nodeId={
                            property.input!.elementType === 'node'
                                ? property.input!.id
                                : (property.input! as any).node.id
                        }
                        name={property.input!.name}
                        parentName={
                            property.input!.elementType === 'property'
                                ? (property.input! as any).node.name
                                : undefined
                        }
                    />
                )}
            </PropertyHeader>
            {!hasInput && propertyService.control && (
                <ControlContainer>
                    {createElement(propertyService.control, { property })}
                </ControlContainer>
            )}
        </Container>
    )
})

const Container = styled.div`
    padding: 9px 12px;
    border-bottom: 1px solid ${props => props.theme.colors.lightBorder};

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
    color: ${props => props.theme.colors.accentColor};
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
    background-color: ${props => props.theme.colors.badgeBackground};
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
