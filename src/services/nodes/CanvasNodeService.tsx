import { ResolvedNode } from '../../store'
import { NodeService } from '../../services_registry'
import { PropertiesWidget } from '../../components/widgets'
import registry from '../../registry'

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

export interface CanvasNodeData {
    content?: any
    width: number
    height: number
}

export const CanvasNodeService: NodeService<'node:canvas', CanvasNodeData> = {
    type: 'node:canvas',
    category: 'render',
    description: `A canvas to render a React node.`,
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
