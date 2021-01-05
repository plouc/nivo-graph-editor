import { NodeService } from '../../services_registry'
import registry from '../../registry'

export type BlendModeNodeType = 'node:blend_mode'

export interface BlendModeNodeData {
    blendMode: string
}

export const BlendModeNodeService: NodeService<BlendModeNodeType, BlendModeNodeData> = {
    type: 'node:blend_mode',
    category: 'colors',
    hasOutput: true,
    properties: [
        {
            type: 'property:blend_mode',
            name: 'blendMode',
            accepts: ['property:blend_mode'],
        },
    ],
    factory: (data = {}) => {
        return {
            blendMode: data?.blendMode ?? 'normal',
        }
    },
    getValue: ({ properties }) => {
        return registry.resolvePropertyValues(properties).blendMode
    },
}
