import { State, isNode, Element, ElementId, Node, isProperty } from './types'
import { useGraph, useStore } from './store'

export const updateNodePosition = (
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

const nodesSelector = (state: State) => state.elements.filter(isNode)
export const useNodes = () => useStore(nodesSelector)

export const useSelectedNodes = () => {
    const state = useStore()
    const { nodes } = useGraph()

    if (state.selectedNodeIds.length === 0) {
        return []
    }

    return nodes.filter(node => state.selectedNodeIds.includes(node.id))
}
