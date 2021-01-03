import { ResolvedNode } from '../state'
import { NodeService, ServiceRegistry } from '../services_registry'

const CanvasNodeWidget = ({
    node,
    registry,
}: {
    node: ResolvedNode
    registry: ServiceRegistry
}) => {
    const props: any = {}
    node.properties.forEach(property => {
        props[property.name] = registry
            .getPropertyService(property.type)
            .getValue(property, registry)
    })

    return (
        <div
            style={{
                width: props.width,
                height: props.height,
                backgroundColor: '#000000',
            }}
        >
            {props.content}
        </div>
    )
}

export interface CanvasNodeData {
    content?: any
    width: number
    height: number
}

export const CanvasNodeService: NodeService<'canvas', CanvasNodeData> = {
    type: 'canvas',
    category: 'render',
    description: `A canvas to render a React node.`,
    hasOutput: false,
    properties: [
        {
            type: 'ref',
            name: 'content',
            hasInput: true,
        },
        {
            type: 'number',
            name: 'width',
            hasInput: true,
        },
        {
            type: 'number',
            name: 'height',
            hasInput: true,
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
    // widget: CanvasNodeWidget,
}
