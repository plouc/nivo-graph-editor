import styled from 'styled-components'
import { FiShare2 } from 'react-icons/fi'
import { NodeService } from '../../services_registry'
import registry from '../../registry'
import { getCategoryColor } from '../../theming'

export interface ValueLinksNodeData {
    links: {
        source: string
        target: string
        value: number
    }[]
}

const ValueLinksNodeIcon = ({ size, category }: { size: number; category: string }) => {
    return (
        <Icon
            category={category}
            style={{
                width: size,
                height: size,
            }}
        >
            <FiShare2 />
        </Icon>
    )
}

const Icon = styled.div<{
    category: string
}>`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => getCategoryColor(props.category, props.theme)};

    svg {
        width: 70%;
        height: 70%;
    }
`

export const ValueLinksNodeService: NodeService<'node:value_links', ValueLinksNodeData> = {
    type: 'node:value_links',
    description:
        'An array of links between a source and a target plus a value bound to this relationship.',
    category: 'data',
    icon: ValueLinksNodeIcon,
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
