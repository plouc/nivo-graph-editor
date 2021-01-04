import { useMemo } from 'react'
import create from 'zustand'
import shallow from 'zustand/shallow'
import {
    Element,
    ElementId,
    State,
    Node,
    ResolvedNode,
    isNode,
    Property,
    ResolvedProperty,
    isProperty,
    Link,
    ResolvedLink,
    isLink,
    SerializedElements,
} from './types'
import { generateElementId } from './generateElementId'
import registry from '../registry'

const DEFAULT_NODE_HEADER_HEIGHT = 24
const PROPERTY_HEIGHT = 20

const updateNodePosition = (
    elements: Element[],
    nodeId: ElementId | null,
    offset: [number, number]
): Element[] => {
    if (nodeId === null) {
        return elements
    }

    const node: Node | undefined = elements.find(
        element => isNode(element) && element.id === nodeId
    ) as any
    if (!node) {
        return elements
    }

    return elements.map(element => {
        if (
            (isNode(element) && element.id === node.id) ||
            (isProperty(element) && node.properties.includes(element.id))
        ) {
            return {
                ...element,
                x: element.x + offset[0],
                y: element.y + offset[1],
            }
        }

        return element
    })
}

export const useStore = create<State>(set => ({
    settings: {
        themeId: 'light',
    },
    setSettings: partialSettings =>
        set(state => {
            return {
                settings: {
                    ...state.settings,
                    ...partialSettings,
                },
            }
        }),
    elements: [],
    selectedNodeIds: [],
    setSelectedNodeIds: selectedNodeIds => set(() => ({ selectedNodeIds })),
    createNode: type =>
        set(state => {
            const nodeService = registry.getNodeService(type)

            const newNode: Node = {
                elementType: 'node',
                id: generateElementId(),
                type: type,
                name: nodeService.type.replace('_', ' '),
                x: 100,
                y: 100,
                width: 120,
                height: 100,
                properties: [],
                data: nodeService.factory(),
            }

            const newProperties: Property[] = []
            nodeService.properties.forEach(property => {
                const propertyService = registry.getPropertyService(property.type)

                const newProperty: Property = {
                    ...property,
                    elementType: 'property',
                    id: generateElementId(),
                    nodeId: newNode.id,
                    name: property.name,
                    x: newNode.x,
                    y:
                        newNode.y +
                        DEFAULT_NODE_HEADER_HEIGHT +
                        newProperties.length * PROPERTY_HEIGHT,
                    height: PROPERTY_HEIGHT,
                    width: newNode.width,
                    hasInput: property.hasInput || false,
                    hasOutput: property.hasOutput || false,
                }

                newProperties.push(
                    propertyService.hydrate(newProperty, newNode.data[property.name])
                )
            })

            newNode.properties = newProperties.map(property => property.id)

            return {
                elements: [...state.elements, ...newProperties, newNode],
                selectedNodeIds: [newNode.id],
            }
        }),
    removeNode: id =>
        set(state => {
            return {
                elements: state.elements.filter(element => element.id !== id),
            }
        }),
    updateNode: (id, patch) =>
        set(state => {
            const updatedElements = state.elements.map(element => {
                if (!isNode(element) || element.id !== id) {
                    return element
                }

                return {
                    ...element,
                    ...patch,
                }
            })

            return {
                elements: updatedElements,
            }
        }),
    updateProperty: (propertyId, patch) =>
        set(state => {
            const updatedElements = state.elements.map(element => {
                if (!isProperty(element) || element.id !== propertyId) {
                    return element
                }

                return {
                    ...element,
                    ...patch,
                }
            })

            return {
                elements: updatedElements,
            }
        }),
    loadGraph: graph =>
        set(state => {
            const elements: any[] = []

            graph.nodes.forEach((node: any) => {
                const nodeService = registry.getNodeService(node.type)
                const propertyIds: ElementId[] = []

                nodeService.properties.forEach(property => {
                    const propertyService = registry.getPropertyService(property.type)

                    const propertyId = node.data[property.name]
                        ? node.data[property.name].id
                        : generateElementId()

                    let newProperty = {
                        ...propertyService.factory(property),
                        ...property,
                        elementType: 'property',
                        id: propertyId,
                        nodeId: node.id,
                        name: property.name,
                        x: node.x,
                        y:
                            DEFAULT_NODE_HEADER_HEIGHT +
                            node.y +
                            propertyIds.length * PROPERTY_HEIGHT,
                        width: node.width,
                        height: PROPERTY_HEIGHT,
                    } as Property

                    if (node.data[property.name]) {
                        newProperty = propertyService.hydrate(
                            newProperty,
                            node.data[property.name].data
                        )
                    }

                    elements.push(newProperty)
                    propertyIds.push(newProperty.id)
                })

                elements.push({
                    elementType: 'node',
                    id: node.id,
                    type: node.type,
                    name: node.name || node.type.replace('_', ' '),
                    x: node.x,
                    y: node.y,
                    width: node.width,
                    height: DEFAULT_NODE_HEADER_HEIGHT + propertyIds.length * PROPERTY_HEIGHT,
                    properties: propertyIds,
                })
            })

            graph.links.forEach((link: any) => {
                elements.push({
                    elementType: 'link',
                    id: link.id,
                    sourceId: link.sourceId,
                    targetId: link.targetId,
                })
            })

            return {
                selectedNodeIds: [],
                elements,
                drag: {
                    isDragging: false,
                    elementId: null,
                    initial: [0, 0],
                    offset: [0, 0],
                },
            }
        }),
    //
    // dragging
    //
    drag: {
        isDragging: false,
        elementId: null,
        initial: [0, 0],
        offset: [0, 0],
    },
    startDrag: (elementId, initial) =>
        set(state => {
            return {
                drag: {
                    isDragging: true,
                    elementId: elementId,
                    initial,
                    offset: [0, 0],
                },
            }
        }),
    updateDrag: position =>
        set(state => {
            const offset: [number, number] = [
                position[0] - state.drag.initial[0],
                position[1] - state.drag.initial[1],
            ]

            return {
                drag: {
                    ...state.drag,
                    offset,
                    initial: [position[0], position[1]],
                },
                elements: updateNodePosition(state.elements, state.drag.elementId, offset),
            }
        }),
    stopDrag: () =>
        set(state => {
            return {
                drag: {
                    isDragging: false,
                    elementId: null,
                    initial: [0, 0],
                    offset: [0, 0],
                },
            }
        }),
    linking: {
        isLinking: false,
        elementId: undefined,
        type: 'source',
        anchor: [0, 0],
        position: [0, 0],
        previous: [0, 0],
    },
    startLinking: ({ elementId, type, anchor, initial }) =>
        set(() => {
            return {
                linking: {
                    isLinking: true,
                    elementId,
                    type,
                    anchor,
                    position: anchor,
                    previous: initial,
                },
            }
        }),
    updateLinking: position =>
        set(state => {
            const offset = [
                position[0] - state.linking.previous[0],
                position[1] - state.linking.previous[1],
            ]

            return {
                linking: {
                    ...state.linking,
                    position: [
                        state.linking.position[0] + offset[0],
                        state.linking.position[1] + offset[1],
                    ],
                    previous: position,
                },
            }
        }),
    setLinkingPotentialPort: (elementId, type) =>
        set(state => {
            if (
                // no current linking
                !state.linking.isLinking ||
                // source & target are identical
                elementId === state.linking.elementId ||
                // both are sources or targets
                state.linking.type === type
            ) {
                return state
            }

            return {
                linking: {
                    ...state.linking,
                    potentialId: elementId,
                },
            }
        }),
    resetLinkingPotentialPort: () =>
        set(state => {
            return {
                linking: {
                    ...state.linking,
                    potentialId: undefined,
                },
            }
        }),
    stopLinking: () =>
        set(state => {
            let elements = state.elements
            if (state.linking.elementId !== undefined && state.linking.potentialId !== undefined) {
                const link: Link = {
                    id: generateElementId(),
                    elementType: 'link',
                    sourceId:
                        state.linking.type === 'source'
                            ? state.linking.elementId
                            : state.linking.potentialId,
                    targetId:
                        state.linking.type === 'source'
                            ? state.linking.potentialId
                            : state.linking.elementId,
                }

                elements = [...elements, link]
            }

            return {
                elements,
                linking: {
                    isLinking: false,
                    type: 'source',
                    anchor: [0, 0],
                    position: [0, 0],
                    previous: [0, 0],
                },
            }
        }),
    link: (sourceId: ElementId, targetId: ElementId) =>
        set(state => {
            const link: Link = {
                id: generateElementId(),
                elementType: 'link',
                sourceId,
                targetId,
            }

            return {
                elements: [...state.elements, link],
            }
        }),
    unlink: (sourceId: ElementId, targetId: ElementId) =>
        set(state => {
            return {
                elements: state.elements.filter(element => {
                    return (
                        !isLink(element) ||
                        element.sourceId !== sourceId ||
                        element.targetId !== targetId
                    )
                }),
            }
        }),
}))

const settingsSelector = (state: State) => state.settings
export const useSettings = () => useStore(settingsSelector)

const loadGraphSelector = (state: State) => state.loadGraph
export const useLoadGraph = () => useStore(loadGraphSelector)

const createNodeSelector = (state: State) => state.createNode
export const useCreateNode = () => useStore(createNodeSelector)

const updateNodeSelector = (state: State) => state.updateNode
export const useUpdateNode = () => useStore(updateNodeSelector)

const unlinkSelector = (state: State) => state.unlink
export const useUnlink = () => useStore(unlinkSelector)

const setSelectedNodeIdsSelector = (state: State) => state.setSelectedNodeIds
export const useSetSelectedNodeIds = () => useStore(setSelectedNodeIdsSelector)

export const useLinkingActions = () =>
    useStore(
        state => ({
            startLinking: state.startLinking,
            updateLinking: state.updateLinking,
            setLinkingPotentialPort: state.setLinkingPotentialPort,
            resetLinkingPotentialPort: state.resetLinkingPotentialPort,
        }),
        shallow
    )

const serializeProperties = (properties: ResolvedProperty[]) => {
    const props: any = {}
    properties.forEach(property => {
        props[property.name] = {
            id: property.id,
            data: registry.getPropertyService(property.type).serialize(property),
        }
    })

    return props
}

export const serializeElements = (
    nodes: ResolvedNode[],
    links: ResolvedLink[]
): SerializedElements => {
    return {
        nodes: nodes.map(node => {
            return {
                id: node.id,
                type: node.type,
                name: node.name,
                x: node.x,
                y: node.y,
                width: node.width,
                data: serializeProperties(node.properties),
            }
        }),
        links: links.map(link => {
            return {
                id: link.id,
                sourceId: link.source.id,
                targetId: link.target.id,
            }
        }),
    }
}

const resolveGraph = (elements: Element[]) => {
    const resolvedNodes: Record<ElementId, ResolvedNode> = {}
    const propertiesByNodeId: Record<ElementId, ElementId[]> = {}
    const resolvedProperties: Record<ElementId, ResolvedProperty> = {}
    const resolvedLinks: Record<ElementId, ResolvedLink> = {}

    const nodes = elements.filter(isNode)
    const properties = elements.filter(isProperty)
    const links = elements.filter(isLink)

    // first pass to resolve nodes without resolving
    // their properties.
    nodes.forEach(node => {
        propertiesByNodeId[node.id] = node.properties

        resolvedNodes[node.id] = {
            ...node,
            isSelected: false,
            properties: [],
        }
    })

    // first pass to resolve properties without resolving
    // dependencies.
    properties.forEach(property => {
        const propertyNode = resolvedNodes[property.nodeId]
        if (!propertyNode) {
            throw new Error(`unable to find property node: ${property.nodeId}`)
        }

        resolvedProperties[property.id] = {
            ...property,
            node: propertyNode,
            dependencies: [],
        }
    })

    // assign resolved properties to nodes.
    Object.values(resolvedNodes).forEach(node => {
        if (node.id in propertiesByNodeId) {
            propertiesByNodeId[node.id].forEach(propertyId => {
                const property = resolvedProperties[propertyId]
                if (!property) {
                    throw new Error(`unable to find property: ${propertyId}`)
                }

                node.properties.push(property)
            })
        }
    })

    links.forEach(link => {
        const source: ResolvedNode | ResolvedProperty =
            resolvedNodes[link.sourceId] || resolvedProperties[link.sourceId]
        if (!source) {
            throw new Error(`unable to find link source: ${link.sourceId}`)
        }

        const target: ResolvedNode | ResolvedProperty =
            resolvedNodes[link.targetId] || resolvedProperties[link.targetId]
        if (!target) {
            throw new Error(`unable to find link target: ${link.sourceId}`)
        }

        // @ts-ignore
        if (target.elementType === 'property') {
            // @ts-ignore
            target.input = source
        }

        resolvedLinks[link.id] = {
            ...link,
            source,
            target,
        }
    })

    return {
        nodes: Object.values(resolvedNodes),
        properties: Object.values(resolvedProperties),
        links: Object.values(resolvedLinks),
    }
}

export const useGraph = () => {
    const { elements, selectedNodeIds } = useStore()

    const graph = useMemo(() => resolveGraph(elements), [elements])

    useMemo(() => {
        graph.nodes.forEach(node => {
            node.isSelected = selectedNodeIds.includes(node.id)
        })
    }, [graph, selectedNodeIds])

    return graph
}
