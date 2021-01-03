import { AreaBump } from '@nivo/bump'
import { NodeService } from '../services_registry'

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

export const AreaBumpNodeService: NodeService<'area_bump', AreaBumpNodeData> = {
    type: 'area_bump',
    category: 'charts',
    description: `An AreaBump chart from @nivo/bump package.`,
    properties: [
        {
            type: 'ref',
            name: 'data',
            hasInput: true,
        },
        {
            type: 'number',
            name: 'width',
            hasInput: true,
            hasOutput: true,
        },
        {
            type: 'number',
            name: 'height',
            hasInput: true,
            hasOutput: true,
        },
        {
            type: 'ref',
            name: 'margin',
            hasInput: true,
        },
        {
            type: 'number',
            name: 'spacing',
        },
        {
            type: 'number',
            name: 'xPadding',
        },
        {
            type: 'ref',
            name: 'theme',
            hasInput: true,
        },
        {
            type: 'ref',
            name: 'colors',
            hasInput: true,
        },
        {
            type: 'blend_mode',
            name: 'blendMode',
            hasInput: true,
        },
        {
            type: 'ref',
            name: 'borderColor',
            hasInput: true,
        },
        {
            type: 'ref',
            name: 'axisTop',
            hasInput: true,
        },
        {
            type: 'ref',
            name: 'axisBottom',
            hasInput: true,
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
                .getValue(property, registry)
        })

        return <AreaBump {...value} isInteractive={false} />
    },
}
