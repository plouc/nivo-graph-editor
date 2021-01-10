import styled from 'styled-components'
import { getCategoryColor } from '../../../theming'

const IconSvg = ({ category }: { category: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            width="104"
            height="104"
            viewBox="0 0 104 104"
        >
            <g transform="translate(1,1)">
                <g transform="translate(51, 51)">
                    <ChordPath
                        d="M34.49126202010697,25.40902289070412A42.839999999999996,42.839999999999996,0,0,1,2.6231934437736302e-15,42.839999999999996Q0,0,19.322824060709078,-38.23472335873351A42.839999999999996,42.839999999999996,0,0,1,39.44233649680935,-16.720277858709803Q0,0,34.49126202010697,25.40902289070412Z"
                        category={category}
                    />
                    <ChordPath
                        d="M2.6231934437736302e-15,42.839999999999996A42.839999999999996,42.839999999999996,0,0,1,-34.49126202010697,25.409022890704122Q0,0,2.6231934437736302e-15,42.839999999999996Z"
                        category={category}
                    />
                    <ChordPath
                        d="M-34.49126202010697,25.409022890704122A42.839999999999996,42.839999999999996,0,0,1,-40.9145315685421,-12.699082901011849Q0,0,-29.26109592733837,-31.28983645101236A42.839999999999996,42.839999999999996,0,0,1,-2.1411076115558973,-42.786461155320346Q0,0,-34.49126202010697,25.409022890704122Z"
                        category={category}
                    />
                </g>
                <g transform="translate(51, 51)">
                    <ChordArc
                        d="M3.1228493378257506e-15,-51A51,51,0,0,1,46.9551624962016,-19.905092688940243L39.44233649680935,-16.720277858709803A42.839999999999996,42.839999999999996,0,0,0,2.6231934437736302e-15,-42.839999999999996Z"
                        category={category}
                    />
                    <ChordArc
                        d="M47.89132076681839,-17.533436491735138A51,51,0,0,1,42.52152235713082,28.158837625726377L35.71807877998989,23.653423605610158A42.839999999999996,42.839999999999996,0,0,0,40.228709444127446,-14.728086653057515Z"
                        category={category}
                    />
                    <ChordArc
                        d="M41.06102621441307,30.248836774647764A51,51,0,0,1,-48.70777567683584,-15.117955834537916L-40.9145315685421,-12.699082901011849A42.839999999999996,42.839999999999996,0,0,0,34.49126202010697,25.40902289070412Z"
                        category={category}
                    />
                    <ChordArc
                        d="M-47.89132076681839,-17.533436491735145A51,51,0,0,1,-2.5489376328046403,-50.93626328014327L-2.1411076115558973,-42.786461155320346A42.839999999999996,42.839999999999996,0,0,0,-40.228709444127446,-14.728086653057519Z"
                        category={category}
                    />
                </g>
            </g>
        </svg>
    )
}

const ChordPath = styled.path<{
    category: string
}>`
    fill: ${props => getCategoryColor(props.category, props.theme)};
    fill-opacity: 0.5;
`

const ChordArc = styled.path<{
    category: string
}>`
    fill: ${props => getCategoryColor(props.category, props.theme)};
`

export const ChordNodeIcon = ({ size, category }: { size: number; category: string }) => {
    return (
        <Container
            style={{
                width: size,
                height: size,
            }}
        >
            <IconSvg category={category} />
        </Container>
    )
}

const Container = styled.div`
    svg {
        width: 100%;
        height: 100%;
    }
`
