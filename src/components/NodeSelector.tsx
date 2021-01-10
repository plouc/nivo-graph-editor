import {
    ChangeEvent,
    createElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import styled from 'styled-components'
import { FaSearch, FaTimes } from 'react-icons/fa'
import registry from '../registry'
import { useCreateNode } from '../store'
import { NodeService } from '../services_registry'
import { getCategoryColor } from '../theming'

const NodeType = ({ type, onCreate }: { type: NodeService; onCreate: () => void }) => {
    const createNode = useCreateNode()
    const hasIcon = type.icon !== undefined

    return (
        <NodeTypeItem
            category={type.category}
            hasIcon={hasIcon}
            onClick={() => {
                createNode(type.type)
                onCreate()
            }}
        >
            {type.icon && (
                <NodeTypeIcon>
                    {createElement(type.icon, { size: 42, category: type.category })}
                </NodeTypeIcon>
            )}
            <div>
                <NodeTypeTitle category={type.category}>
                    {type.type.replace('node:', '').replace('_', ' ')}
                </NodeTypeTitle>
                {type.description && <NodeTypeDescription>{type.description}</NodeTypeDescription>}
            </div>
        </NodeTypeItem>
    )
}

const Category = ({
    category,
    onCreate,
}: {
    category: {
        category: string
        types: NodeService[]
    }
    onCreate: () => void
}) => {
    return (
        <div>
            <CategoryTitle category={category.category}>
                {category.category.replace('_', ' ')}
            </CategoryTitle>
            {category.types.map(type => (
                <NodeType key={type.type} type={type} onCreate={onCreate} />
            ))}
        </div>
    )
}

export const NodeSelector = ({ onCreate }: { onCreate: () => void }) => {
    const categories = useMemo(() => registry.getNodeServiceCategories(), [])
    const [searchTerm, setSearchTerm] = useState('')
    const searchInput = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (searchInput.current) {
            searchInput.current.focus()
        }
    }, [searchInput])

    const handleSearchTermChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(event.target.value)
        },
        [setSearchTerm]
    )

    const clearSearch = useCallback(() => {
        setSearchTerm('')
    }, [setSearchTerm])

    const filtered = useMemo(() => {
        if (!searchTerm) {
            return categories
        }

        return categories
            .map(category => {
                return {
                    ...category,
                    types: category.types.filter(type => {
                        return type.type.indexOf(searchTerm) !== -1
                    }),
                }
            })
            .filter(category => category.types.length > 0)
    }, [categories, searchTerm])

    return (
        <>
            <SearchBox>
                <SearchInput
                    ref={searchInput}
                    type="text"
                    placeholder="search node type"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
                <SearchIcon
                    hasSearchTerm={!!searchTerm}
                    onClick={searchTerm ? clearSearch : undefined}
                >
                    {searchTerm ? <FaTimes /> : <FaSearch />}
                </SearchIcon>
            </SearchBox>
            <Container>
                {filtered.length === 0 && (
                    <NoResult>
                        No node found matching: "<strong>{searchTerm}</strong>"
                    </NoResult>
                )}
                {filtered.map(category => (
                    // @ts-ignore
                    <Category key={category.category} category={category} onCreate={onCreate} />
                ))}
            </Container>
        </>
    )
}

const NoResult = styled.div`
    padding: 16px 12px;
    color: ${props => props.theme.colors.textLight};

    strong {
        color: ${props => props.theme.colors.text};
        font-weight: 600;
    }
`

const SearchBox = styled.div`
    position: relative;
    height: 39px;
    border-bottom: 1px solid ${props => props.theme.colors.border};
`

const SearchInput = styled.input`
    background-color: ${props => props.theme.colors.inputBackground};
    color: ${props => props.theme.colors.inputText};
    width: 100%;
    height: 100%;
    border: none;
    padding: 9px 12px 9px 40px;
    font-size: 14px;
    font-family: inherit;

    &:focus {
        outline: none;
    }
`

const SearchIcon = styled.span<{
    hasSearchTerm: boolean
}>`
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    font-size: ${props => (props.hasSearchTerm ? 12 : 16)}px;
    color: ${props => props.theme.colors.inputText};
    opacity: ${props => (props.hasSearchTerm ? 0.6 : 0.4)};
    width: 38px;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${props => (props.hasSearchTerm ? 'pointer' : 'auto')};
`

const Container = styled.div`
    height: 600px;
    overflow-y: auto;
`

const CategoryTitle = styled.h3<{
    category: string
}>`
    padding: 9px 12px;
    margin: 0;
    background-color: ${props => props.theme.colors.mediumDepthBackground};
    font-size: 16px;
    color: ${props => getCategoryColor(props.category, props.theme)};
`

const NodeTypeIcon = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 64px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.6;
`

const NodeTypeItem = styled.div<{
    hasIcon: boolean
    category: string
}>`
    position: relative;
    min-height: ${props => (props.hasIcon ? '64px' : 'auto')};
    padding: 12px 12px 12px ${props => (props.hasIcon ? 68 : 12)}px;
    border-bottom: 1px solid ${props => props.theme.colors.lightBorder};
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        height: 100%;
        width: 4px;
        background-color: ${props => getCategoryColor(props.category, props.theme)};
        opacity: 0;
    }

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        ${NodeTypeIcon} {
            opacity: 1;
        }
        
        &:after {
            opacity: 1;
        }
    }
`

const NodeTypeTitle = styled.h4<{
    category: string
}>`
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-weight: 600;
    color: ${props => getCategoryColor(props.category, props.theme)};
`

const NodeTypeDescription = styled.div`
    font-weight: 400;
    font-size: 12px;
    margin-top: 6px;
    color: ${props => props.theme.colors.text};
`
