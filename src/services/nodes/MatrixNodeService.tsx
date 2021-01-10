import { NodeService } from '../../services_registry'
import registry from '../../registry'
import {AiOutlineTable} from "react-icons/ai";
import styled from "styled-components";
import {getCategoryColor} from "../../theming";

export interface MatrixNodeData {
    data: number[][]
}

const MatrixNodeIcon = ({ size, category }: { size: number; category: string }) => {
    return (
        <Icon
            category={category}
            style={{
                width: size,
                height: size,
            }}
        >
            <AiOutlineTable />
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

export const MatrixNodeService: NodeService<'node:matrix', MatrixNodeData> = {
    type: 'node:matrix',
    category: 'data',
    icon: MatrixNodeIcon,
    hasOutput: true,
    properties: [
        {
            name: 'matrix',
            type: 'property:matrix',
            category: 'data',
            accepts: ['property:matrix'],
        },
    ],
    factory: data => {
        return {
            data: data?.data || [],
        }
    },
    getValue: ({ properties }) => {
        return registry.resolvePropertyValues(properties).matrix || []
    },
}
