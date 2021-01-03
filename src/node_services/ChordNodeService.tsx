import { Chord } from '@nivo/chord'
import { NodeService } from '../services_registry'

export interface ChordNodeData {
    matrix?: any
    keys?: any
    width: number
    height: number
    margin?: any
    innerRadiusRatio: number
    innerRadiusOffset: number
    theme?: any
    colors?: any
}

export const ChordNodeService: NodeService<'chord', ChordNodeData> = {
    type: 'chord',
    category: 'charts',
    description: `An Chord diagram from @nivo/chord package.`,
    hasOutput: true,
    properties: [
        {
            type: 'ref',
            name: 'matrix',
            hasInput: true,
        },
        {
            type: 'array_string',
            name: 'keys',
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
            name: 'innerRadiusRatio',
        },
        {
            type: 'number',
            name: 'innerRadiusOffset',
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
    ],
    factory: (data = {}) => {
        return {
            keys: data?.keys ?? [],
            width: data?.width ?? 420,
            height: data?.height ?? 240,
            innerRadiusRatio: data?.innerRadiusRatio ?? 0.9,
            innerRadiusOffset: data?.innerRadiusOffset ?? 0,
        }
    },
    getValue: ({ properties }, registry) => {
        const value: any = {}
        properties.forEach(property => {
            value[property.name] = registry
                .getPropertyService(property.type)
                .getValue(property, registry)
        })

        // check if the chart can be rendered
        if (!Array.isArray(value.matrix) || !Array.isArray(value.keys)) {
            return <div />
        }

        return <Chord {...value} isInteractive={true} />
    },
}
