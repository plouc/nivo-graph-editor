import { AreaBump } from '@nivo/bump'
import { NodeService } from '../services_registry'

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
            type: 'property:ref',
            name: 'data',
            accepts: ['node:series_xy'],
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
        {
            type: 'property:ref',
            name: 'margin',
            accepts: ['node:margin'],
        },
        {
            type: 'property:number',
            name: 'spacing',
            accepts: ['property:number'],
        },
        {
            type: 'property:number',
            name: 'xPadding',
            accepts: ['property:number'],
        },
        {
            type: 'property:ref',
            name: 'theme',
            accepts: ['node:nivo_theme'],
        },
        {
            type: 'property:ref',
            name: 'colors',
            accepts: ['node:color_scheme'],
        },
        {
            type: 'property:blend_mode',
            name: 'blendMode',
            accepts: ['node:blend_mode'],
        },
        {
            type: 'property:ref',
            name: 'borderColor',
            accepts: [],
        },
        {
            type: 'property:ref',
            name: 'axisTop',
            accepts: ['node:axis'],
        },
        {
            type: 'property:ref',
            name: 'axisBottom',
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
    getValue: ({ properties }, registry) => {
        const value: any = {}
        properties.forEach(property => {
            value[property.name] = registry
                .getPropertyService(property.type)
                // @ts-ignore
                .getValue(property, registry)
        })

        return <AreaBump {...value} isInteractive={false} />
    },
}
