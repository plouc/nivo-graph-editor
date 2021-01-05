import { ResolvedNode } from '../store'
import { NodeService, ServiceRegistry } from '../services_registry'
import { PropertiesWidget } from '../components/PropertiesWidget'

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
            // @ts-ignore
            .getValue(property, registry)
    })

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
            accepts: ['node:chord', 'node:line', 'node:scatterplot'],
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
