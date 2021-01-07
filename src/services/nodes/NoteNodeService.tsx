import styled from 'styled-components'
import { NodeService } from '../../services_registry'
import { ResolvedNode } from '../../store'
import registry from '../../registry'

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

export const NoteNodeService: NodeService<'node:note', NoteNodeData> = {
    type: 'node:note',
    category: 'misc',
    description: `A text note.`,
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
