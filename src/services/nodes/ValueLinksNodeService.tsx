import { NodeService } from '../../services_registry'
import registry from '../../registry'

export interface ValueLinksNodeData {
    links: {
        source: string
        target: string
        value: number
    }[]
}

export const ValueLinksNodeService: NodeService<'node:value_links', ValueLinksNodeData> = {
    type: 'node:value_links',
    category: 'data',
    description:
        'An array of links between a source and a target plus a value bound to this relationship.',
    hasOutput: true,
    properties: [
        {
            name: 'links',
            type: 'property:array_value_link',
            category: 'data',
            accepts: ['property:array_value_link'],
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
        return registry.resolvePropertyValues(properties).links
    },
}
