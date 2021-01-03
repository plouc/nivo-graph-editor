import { NodeService } from '../services_registry'

export interface BlendModeNodeData {
    blendMode: string
}

export const BlendModeNodeService: NodeService<'blend_mode', BlendModeNodeData> = {
    type: 'blend_mode',
    category: 'colors',
    hasOutput: true,
    properties: [
        {
            type: 'blend_mode',
            name: 'blendMode',
        },
    ],
    factory: (data = {}) => {
        return {
            blendMode: data?.blendMode ?? 'normal',
        }
    },
    getValue: node => {
        return (node.properties[0] as any).value
    },
}
