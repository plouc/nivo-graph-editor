import {
    ChangeEvent,
    KeyboardEvent as ReactKeyboardEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'
import styled from 'styled-components'
import { MdEdit } from 'react-icons/md'
import { ResolvedNode, useStore } from '../../state'
import { useDocumentEventListener } from '../../utils/useDocumentEventListener'

export const NodeName = ({ node }: { node: ResolvedNode }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(node.name)
    const { updateNode } = useStore()
    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current?.focus()
        }
    }, [isEditing, inputRef])

    useEffect(() => {
        setName(node.name)
        setIsEditing(false)
    }, [node.name, setName, setIsEditing])

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value)
        },
        [setName]
    )

    const handleEnter = (event: ReactKeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            updateNode(node.id, { name })
            setIsEditing(false)
        }
    }

    const handleEscape = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsEditing(false)
            }
        },
        [setIsEditing]
    )
    useDocumentEventListener('keydown', handleEscape)

    return (
        <Container
            onClick={() => {
                if (!isEditing) {
                    setIsEditing(true)
                }
            }}
        >
            {!isEditing && (
                <>
                    <Name>{node.name}</Name>
                    <Icon>
                        <MdEdit />
                    </Icon>
                </>
            )}
            {isEditing && (
                <Input
                    ref={inputRef}
                    onKeyPress={handleEnter}
                    type="text"
                    value={name}
                    onChange={handleChange}
                />
            )}
        </Container>
    )
}

const Icon = styled.span`
    margin-left: 12px;
    width: 24px;
    height: 24px;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #333333;
    color: #999999;
    cursor: pointer;
    flex-shrink: 0;
`

const Input = styled.input`
    width: calc(100% - 32px);
    height: 32px;
    border: none;
    padding: 5px 9px;
    border-radius: 2px;
    font-weight: 800;
    font-family: inherit;
    background-color: #aaaaaa;
    font-size: 14px;

    &:focus {
        outline: 0;
    }
`

const Name = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const Container = styled.div`
    height: 32px;
    padding: 0;
    margin: 0 32px 9px 0;
    font-size: 16px;
    font-weight: 800;
    display: flex;
    align-items: center;
`
