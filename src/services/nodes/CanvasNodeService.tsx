import { ResolvedNode } from '../../store'
import { NodeService } from '../../services_registry'
import { FaImage } from 'react-icons/fa'
import { PropertiesWidget } from '../../components/widgets'
import registry from '../../registry'
import styled from 'styled-components'
import { getCategoryColor } from '../../theming'

const CanvasNodeWidget = ({ node }: { node: ResolvedNode }) => {
    const props = registry.resolvePropertyValues(node.properties)

    return (
        <>
            <PropertiesWidget properties={node.properties} />
            <div
                style={{
                    width: props.width,
                    height: props.height,
                    backgroundColor: '#000000',
                    overflow: 'hidden',
                }}
            >
                {props.content}
            </div>
        </>
    )
}

const CanvasNodeIcon = ({ size, category }: { size: number; category: string }) => {
    return (
        <Icon
            category={category}
            style={{
                width: size,
                height: size,
            }}
        >
            <FaImage />
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

export interface CanvasNodeData {
    content?: any
    width: number
    height: number
}

export const CanvasNodeService: NodeService<'node:canvas', CanvasNodeData> = {
    type: 'node:canvas',
    description: `A canvas to render a React node.`,
    category: 'render',
    icon: CanvasNodeIcon,
    hasOutput: false,
    properties: [
        {
            name: 'content',
            type: 'property:ref',
            category: 'render',
            accepts: [
                'node:area_bump',
                'node:chord',
                'node:line',
                'node:sankey',
                'node:scatterplot',
            ],
        },
        {
            name: 'width',
            type: 'property:number',
            category: 'dimensions',
            accepts: ['property:number'],
            hasOutput: true,
        },
        {
            name: 'height',
            type: 'property:number',
            category: 'dimensions',
            accepts: ['property:number'],
            hasOutput: true,
        },
    ],
    factory: (data = {}) => {
        return {
            content: undefined,
            width: data?.width ?? 300,
            height: data?.height ?? 240,
        }
    },
    getValue: () => ({}),
    widget: CanvasNodeWidget,
}
