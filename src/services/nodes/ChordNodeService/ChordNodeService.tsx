import { Chord } from '@nivo/chord'
import { NodeService } from '../../../services_registry'
import registry from '../../../registry'
import { ChordNodeIcon } from './ChordNodeIcon'

export const chordNodeType = 'node:chord' as const
export type ChordNodeType = typeof chordNodeType

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

export const ChordNodeService: NodeService<ChordNodeType, ChordNodeData> = {
    type: chordNodeType,
    description: `An Chord diagram from @nivo/chord package.`,
    category: 'charts',
    icon: ChordNodeIcon,
    hasOutput: true,
    properties: [
        {
            name: 'matrix',
            type: 'property:ref',
            category: 'data',
            accepts: ['node:matrix'],
        },
        {
            name: 'keys',
            type: 'property:array_string',
            category: 'data',
            accepts: ['property:array_string'],
            hasOutput: true,
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
            name: 'innerRadiusRatio',
            type: 'property:number',
            category: 'dimensions',
            accepts: ['property:number'],
            hasOutput: true,
            options: {
                controlType: 'range',
                min: 0,
                max: 1,
                step: 0.01,
            },
        },
        {
            name: 'innerRadiusOffset',
            type: 'property:number',
            category: 'dimensions',
            accepts: ['property:number'],
            hasOutput: true,
            options: {
                controlType: 'range',
                min: 0,
                max: 1,
                step: 0.01,
            },
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
        if (!Array.isArray(props.matrix) || !Array.isArray(props.keys) || props.keys.length === 0) {
            return <div />
        }

        return <Chord {...props} isInteractive={true} />
    },
}
