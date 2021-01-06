import { NodeService } from '../../services_registry'
import registry from '../../registry'

export interface SankeyDataNodeData {
    nodes: string[]
    links: {
        source: string
        target: string
        value: number
    }[]
}

export const SankeyDataNodeService: NodeService<'node:sankey_data', SankeyDataNodeData> = {
    type: 'node:sankey_data',
    category: 'data',
    description: 'Nodes & Links to be used with a sankey diagram.',
    hasOutput: true,
    properties: [
        {
            name: 'nodes',
            type: 'property:array_string',
            category: 'data',
            accepts: ['property:array_string'],
            hasOutput: true,
        },
        {
            name: 'links',
            type: 'property:array_value_link',
            category: 'data',
            accepts: ['node:value_links'],
            hasOutput: true,
        },
    ],
    // @ts-ignore
    factory: (data = {}) => {
        return {
            // @ts-ignore
            nodes: data?.nodes ? data.nodes.map(id => ({ id })) : [],
            // @ts-ignore
            links: data?.links ?? [],
        }
    },
    getValue: ({ properties }) => {
        const propertyValues = registry.resolvePropertyValues(properties)

        const links = propertyValues.links
        const nodeIds: string[] = propertyValues.nodes

        const filteredLinks = links.filter((link: any) => {
            return nodeIds.includes(link.source) && nodeIds.includes(link.target)
        })

        return {
            links: filteredLinks,
            nodes: nodeIds.map(id => ({ id })),
        }
    },
}
