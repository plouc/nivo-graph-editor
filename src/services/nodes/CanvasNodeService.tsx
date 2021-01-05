import { ResolvedNode } from '../../store'
import { NodeService } from '../../services_registry'
import { PropertiesWidget } from '../../components/PropertiesWidget'
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
            type: 'property:ref',
            name: 'content',
            accepts: ['node:area_bump', 'node:chord', 'node:line', 'node:scatterplot'],
        },
        {
            type: 'property:number',
            name: 'width',
            accepts: ['property:number'],
            hasOutput: true,
        },
        {
            type: 'property:number',
            name: 'height',
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
