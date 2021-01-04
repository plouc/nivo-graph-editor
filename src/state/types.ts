export type ElementId = string

export interface CreateProperty {
    type: string
    name: string
    hasInput?: boolean
    hasOutput?: boolean
}

export interface Property extends CreateProperty {
    name: string
    hasInput: boolean
    hasOutput: boolean
    id: ElementId
    elementType: 'property'
    nodeId: ElementId
    x: number
    y: number
    width: number
    height: number
}

export interface ResolvedProperty extends Property {
    node: ResolvedNode
    dependencies: (ResolvedNode | ResolvedProperty)[]
    input?: ResolvedNode | ResolvedProperty
}

export const isProperty = (element: Element): element is Property =>
    element.elementType === 'property'

export interface Node<Data = any> {
    elementType: 'node'
    type: string
    id: ElementId
    x: number
    y: number
    width: number
    name: string
    data: Data
    height: number
    properties: ElementId[]
}

export interface ResolvedNode extends Omit<Node, 'properties'> {
    isSelected: boolean
    properties: ResolvedProperty[]
}

export interface SerializedNode {
    id: ElementId
    type: string
    name: string
    x: number
    y: number
    width: number
}

export interface SerializedElements {
    nodes: SerializedNode[]
    links: any[]
}

export const isNode = (element: Element): element is Node => element.elementType === 'node'

export interface Link {
    id: ElementId
    elementType: 'link'
    sourceId: ElementId
    targetId: ElementId
}

export const isLink = (element: Element): element is Link => element.elementType === 'link'

export interface ResolvedLink extends Link {
    source: ResolvedNode | ResolvedProperty
    target: ResolvedNode | ResolvedProperty
}

export type Element = Node | Property | Link

export interface AppSettings {
    themeId: string
}

export type State = {
    settings: AppSettings
    setSettings: (partialSettings: Partial<AppSettings>) => void
    // flat representation of all nodes/properties/links
    elements: Element[]
    selectedNodeIds: ElementId[]
    setSelectedNodeIds: (ids: ElementId[]) => void
    createNode: (type: string) => void
    updateNode: (id: ElementId, patch: any) => void
    removeNode: (id: ElementId) => void
    updateProperty: (propertyId: ElementId, patch: any) => void
    loadGraph: (graph: any) => void
    //
    // DRAGGING
    //
    drag: {
        isDragging: boolean
        elementId: ElementId | null
        initial: [number, number]
        offset: [number, number]
    }
    startDrag: (elementId: ElementId, initial: [number, number]) => void
    updateDrag: (position: [number, number]) => void
    stopDrag: () => void
    //
    // LINKING
    //
    linking: {
        isLinking: boolean
        elementId?: ElementId
        potentialId?: ElementId
        type: 'source' | 'target'
        anchor: [number, number]
        position: [number, number]
        previous: [number, number]
    }
    startLinking: (props: {
        elementId?: ElementId
        type: 'source' | 'target'
        anchor: [number, number]
        initial: [number, number]
    }) => void
    updateLinking: (position: [number, number]) => void
    setLinkingPotentialPort: (elementId: ElementId, type: 'source' | 'target') => void
    resetLinkingPotentialPort: () => void
    stopLinking: () => void
    link: (sourceId: ElementId, targetId: ElementId) => void
    unlink: (sourceId: ElementId, targetId: ElementId) => void
}
