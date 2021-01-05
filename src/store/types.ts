import { PropertyType, NodeType } from '../registry'

export type ElementId = string

export interface CreateProperty<
    Type extends PropertyType = PropertyType,
    Data = any,
    Options = any
> {
    elementType: 'property'
    id: ElementId
    type: Type
    category: string
    name: string
    accepts: string[]
    hasOutput: boolean
    data: Data
    options: Options
}

export type PropertySpec<
    Type extends PropertyType = PropertyType,
    Data = any,
    Options = any
> = Pick<CreateProperty<Type, Data, Options>, 'type' | 'category' | 'name'> &
    Partial<
        Omit<
            CreateProperty<Type, Data, Options>,
            'elementType' | 'type' | 'category' | 'name' | 'id'
        >
    >

export interface Property<Type extends PropertyType = PropertyType, Data = any, Options = any>
    extends CreateProperty<Type, Data, Options> {
    nodeId: ElementId
    x: number
    y: number
    width: number
    height: number
}

export interface ResolvedProperty<
    Type extends PropertyType = PropertyType,
    Data = any,
    Options = any
> extends Property<Type, Data, Options> {
    node: ResolvedNode
    dependencies: (ResolvedNode | ResolvedProperty)[]
    input?: ResolvedNode | ResolvedProperty<Type>
}

export const isProperty = <Type extends PropertyType = PropertyType>(
    element: Element
): element is Property<Type> => element.elementType === 'property'

export interface Node<Type extends NodeType = NodeType, Data = any> {
    elementType: 'node'
    type: Type
    id: ElementId
    x: number
    y: number
    width: number
    name: string
    data: Data
    height: number
    properties: ElementId[]
}

export interface ResolvedNode<Type extends NodeType = NodeType>
    extends Omit<Node<Type>, 'properties'> {
    isSelected: boolean
    properties: ResolvedProperty[]
}

export interface SerializedNode<Type extends NodeType = NodeType> {
    id: ElementId
    type: Type
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
    createNode: (type: NodeType) => void
    updateNode: (id: ElementId, patch: any) => void
    removeNode: (id: ElementId) => void
    updateProperty: (propertyId: ElementId, patch: any) => void
    loadGraph: (graph: any) => void
    //
    // DRAGGING
    //
    dragging: {
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
        elementType?: string
        accepts: string[]
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
