import { Chord } from '@nivo/chord'
import { NodeService } from '../../services_registry'
import registry from '../../registry'

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

export const ChordNodeService: NodeService<'node:chord', ChordNodeData> = {
    type: 'node:chord',
    category: 'charts',
    description: `An Chord diagram from @nivo/chord package.`,
    hasOutput: true,
    properties: [
        {
            type: 'property:ref',
            name: 'matrix',
            accepts: ['node:matrix'],
        },
        {
            type: 'property:array_string',
            name: 'keys',
            accepts: ['property:array_string'],
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
            name: 'innerRadiusRatio',
            accepts: ['property:number'],
            options: {
                controlType: 'range',
                min: 0,
                max: 1,
                step: 0.01,
            },
        },
        {
            type: 'property:number',
            name: 'innerRadiusOffset',
            accepts: ['property:number'],
            options: {
                controlType: 'range',
                min: 0,
                max: 1,
                step: 0.01,
            },
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
    getValue: ({ properties }) => {
        const props = registry.resolvePropertyValues(properties)

        // check if the chart can be rendered
        if (!Array.isArray(props.matrix) || !Array.isArray(props.keys)) {
            return <div />
        }

        return <Chord {...props} isInteractive={true} />
    },
}
