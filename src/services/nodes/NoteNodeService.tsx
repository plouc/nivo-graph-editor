import styled from 'styled-components'
import {BiNotepad} from "react-icons/bi";
import { NodeService } from '../../services_registry'
import { ResolvedNode } from '../../store'
import registry from '../../registry'
import {getCategoryColor} from "../../theming";

const NoteNodeWidget = ({ node }: { node: ResolvedNode<'node:note'> }) => {
    const props = registry.resolvePropertyValues(node.properties)

    return <NoteContainer>{props.content}</NoteContainer>
}

const NoteContainer = styled.div`
    overflow-y: auto;
    padding: 6px 9px;
    font-size: 11px;
    background-color: ${props => props.theme.colors.mediumDepthBackground};
    color: ${props => props.theme.colors.text};
`

export interface NoteNodeData {
    content?: string
}

const NoteNodeIcon = ({ size, category }: { size: number; category: string }) => {
    return (
        <Icon
            category={category}
            style={{
                width: size,
                height: size,
            }}
        >
            <BiNotepad />
        </Icon>
    )
}

const Icon = styled.div<{
    category: string
}>`
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.9;
    color: ${props => getCategoryColor(props.category, props.theme)};

    svg {
        width: 70%;
        height: 70%;
    }
`


export const NoteNodeService: NodeService<'node:note', NoteNodeData> = {
    type: 'node:note',
    description: `A text note.`,
    category: 'misc',
    icon: NoteNodeIcon,
    hasOutput: false,
    properties: [
        {
            name: 'content',
            type: 'property:long_text',
            category: 'misc',
        },
    ],
    factory: (data = {}) => {
        return {
            content: data?.content ?? 'my note.',
        }
    },
    getValue: ({ properties }) => {
        return registry.resolvePropertyValues(properties)
    },
    widget: NoteNodeWidget,
}
