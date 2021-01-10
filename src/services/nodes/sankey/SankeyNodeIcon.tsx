import styled from 'styled-components'
import { getCategoryColor } from '../../../theming'

const SvgIcon = ({ category }: { category: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            width="104"
            height="104"
            viewBox="0 0 104 104"
        >
            <Rect x="15.6" y="20.8" width="6" height="10.4" category={category} />
            <Rect y="62.4" width="6" height="31.2" category={category} />
            <Rect x="49" y="31.2" width="6" height="41.6" category={category} />
            <Rect x="98" y="10.4" width="6" height="26" category={category} />
            <Rect x="93.60000000000001" y="72.8" width="6" height="15.6" category={category} />
            <Path strokeWidth="10.4" d="M23.6,26C35.3,26,35.3,36.4,47,36.4" category={category} />
            <Path strokeWidth="31.2" d="M8,78C27.5,78,27.5,57.2,47,57.2" category={category} />
            <Path
                strokeWidth="26"
                d="M57,44.199999999999996C76.5,44.199999999999996,76.5,23.400000000000002,96,23.400000000000002"
                category={category}
            />
            <Path
                strokeWidth="15.6"
                d="M57,65C74.30000000000001,65,74.30000000000001,80.60000000000001,91.60000000000001,80.60000000000001"
                category={category}
            />
        </svg>
    )
}

const Rect = styled.rect<{
    category: string
}>`
    fill: ${props => getCategoryColor(props.category, props.theme)};
`

const Path = styled.path<{
    category: string
}>`
    fill: none;
    stroke: ${props => getCategoryColor(props.category, props.theme)};
    stroke-opacity: 0.5;
`

export const SankeyNodeIcon = ({ size, category }: { size: number; category: string }) => {
    return (
        <Container
            style={{
                width: size,
                height: size,
            }}
        >
            <SvgIcon category={category} />
        </Container>
    )
}

const Container = styled.div`
    svg {
        width: 100%;
        height: 100%;
    }
`
