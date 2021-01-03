import { State, isNode } from './types'
import { useGraph, useStore } from './store'

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
