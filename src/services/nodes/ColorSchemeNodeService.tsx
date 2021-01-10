import { NodeService } from '../../services_registry'
import registry from '../../registry'
import {IoColorFilterOutline} from "react-icons/io5";
import styled from "styled-components";
import {getCategoryColor} from "../../theming";

const schemeChoices = [
    { label: 'nivo', value: 'nivo' },
    { label: 'Category 10', value: 'category10' },
    { label: 'Accent', value: 'accent' },
    { label: 'Dark 2', value: 'dark2' },
    { label: 'Paired', value: 'paired' },
    { label: 'Pastel 1', value: 'pastel1' },
    { label: 'Pastel 2', value: 'pastel2' },
    { label: 'Set 1', value: 'set1' },
    { label: 'Set 2', value: 'set2' },
    { label: 'Set 3', value: 'set3' },
    { label: 'Brown - Blue Green', value: 'brown_blueGreen' },
    { label: 'Purple Red - Green', value: 'purpleRed_green' },
    { label: 'Pink - Yellow Green', value: 'pink_yellowGreen' },
    { label: 'Purple - Orange', value: 'purple_orange' },
    { label: 'Red - Blue', value: 'red_blue' },
    { label: 'Red - Grey', value: 'red_grey' },
    { label: 'Red - Yellow - Blue', value: 'red_yellow_blue' },
    { label: 'Red - Yellow - Green', value: 'red_yellow_green' },
    { label: 'Spectral', value: 'spectral' },
]

export interface ColorSchemeNodeData {
    scheme: string
}

const ColorSchemeNodeIcon = ({ size, category }: { size: number; category: string }) => {
    return (
        <Icon
            category={category}
            style={{
                width: size,
                height: size,
            }}
        >
            <IoColorFilterOutline />
        </Icon>
    )
}

const Icon = styled.div<{
    category: string
}>`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => getCategoryColor(props.category, props.theme)};

    svg {
        width: 70%;
        height: 70%;
    }
`

export const ColorSchemeNodeService: NodeService<'node:color_scheme', ColorSchemeNodeData> = {
    type: 'node:color_scheme',
    description: `A predefined color scheme to be used with nivo charts.`,
    category: 'colors_theming',
    icon: ColorSchemeNodeIcon,
    hasOutput: true,
    properties: [
        {
            name: 'scheme',
            type: 'property:choices',
            category: 'colors_theming',
            accepts: ['node:color_scheme'],
            hasOutput: true,
            options: {
                choices: schemeChoices,
            },
        },
    ],
    factory: (data = {}) => {
        return {
            scheme: data?.scheme ?? 'nivo',
        }
    },
    getValue: ({ properties }) => {
        return registry.resolvePropertyValues(properties)
    },
}
