import { AreaBump } from '@nivo/bump'
import { NodeService } from '../../services_registry'
import registry from '../../registry'

export type AreaBumpNodeType = 'node:area_bump'

export interface AreaBumpNodeData {
    data?: any
    width: number
    height: number
    margin?: any
    spacing: number
    xPadding: number
    colors?: any
    blendMode?: string
    borderColor?: any
    axisTop?: any
    axisBottom?: any
}

export const AreaBumpNodeService: NodeService<AreaBumpNodeType, AreaBumpNodeData> = {
    type: 'node:area_bump',
    category: 'charts',
    description: `An AreaBump chart from @nivo/bump package.`,
    hasOutput: true,
    properties: [
        {
            name: 'data',
            type: 'property:ref',
            category: 'data',
            accepts: ['node:series_xy'],
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
        {
            name: 'margin',
            type: 'property:ref',
            category: 'dimensions',
            accepts: ['node:margin'],
        },
        {
            name: 'spacing',
            type: 'property:number',
            category: 'dimensions',
            accepts: ['property:number'],
            hasOutput: true,
        },
        {
            name: 'xPadding',
            type: 'property:number',
            category: 'dimensions',
            accepts: ['property:number'],
            hasOutput: true,
        },
        {
            name: 'theme',
            type: 'property:ref',
            category: 'colors_theming',
            accepts: ['node:nivo_theme'],
        },
        {
            name: 'colors',
            type: 'property:ref',
            category: 'colors_theming',
            accepts: ['node:color_scheme'],
        },
        {
            name: 'blendMode',
            type: 'property:blend_mode',
            category: 'colors_theming',
            accepts: ['node:blend_mode'],
        },
        {
            name: 'borderColor',
            type: 'property:ref',
            category: 'colors_theming',
            accepts: [],
        },
        {
            name: 'axisTop',
            type: 'property:ref',
            category: 'axis_grid',
            accepts: ['node:axis'],
        },
        {
            name: 'axisBottom',
            type: 'property:ref',
            category: 'axis_grid',
            accepts: ['node:axis'],
        },
    ],
    factory: (data = {}) => {
        return {
            width: data?.width ?? 420,
            height: data?.height ?? 240,
            spacing: data?.spacing ?? 3,
            xPadding: data?.xPadding ?? 0.6,
        }
    },
    getValue: ({ properties }) => {
        const props = registry.resolvePropertyValues(properties)

        return <AreaBump {...props} isInteractive={false} />
    },
}
