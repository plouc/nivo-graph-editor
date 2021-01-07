import { ReactNode } from 'react'
import styled from 'styled-components'
import { FaChevronRight, FaCheck } from 'react-icons/fa'
import { useStore } from '../../store'

const ICON_SIZE = 24
const ICON_SPACING = 16

export const LinkingLayer = () => {
    const { linking } = useStore()

    if (!linking.isLinking) {
        return null
    }

    let iconPosition: [number, number]
    if (linking.type === 'source') {
        iconPosition = [linking.position[0] + ICON_SPACING, linking.position[1] - ICON_SIZE / 2]
    } else {
        iconPosition = [
            linking.position[0] - ICON_SIZE - ICON_SPACING,
            linking.position[1] - ICON_SIZE / 2,
        ]
    }

    let icon: ReactNode = <FaChevronRight />
    if (linking.potentialId) {
        icon = <FaCheck />
    }

    return (
        <svg
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
            }}
        >
            <Line
                strokeLinecap="round"
                x1={linking.anchor[0]}
                x2={linking.position[0]}
                y1={linking.anchor[1]}
                y2={linking.position[1]}
            />
            <Circle cx={linking.position[0]} cy={linking.position[1]} r={4} />
            <foreignObject x={iconPosition[0]} y={iconPosition[1]} width={24} height={24}>
                <Icon isValid={!!linking.potentialId}>{icon}</Icon>
            </foreignObject>
        </svg>
    )
}

const Line = styled.line`
    stroke-width: 3px;
    stroke: ${props => props.theme.colors.accentColor};
`

const Circle = styled.circle`
    fill: ${props => props.theme.colors.accentColor};
`

const Icon = styled.div<{
    isValid: boolean
}>`
    width: ${ICON_SIZE}px;
    height: ${ICON_SIZE}px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.colors.topDepthBackground};
    color: ${props =>
        props.isValid ? props.theme.colors.success : props.theme.colors.accentColor};
    border: 2px solid
        ${props => (props.isValid ? props.theme.colors.success : props.theme.colors.accentColor)};
    border-radius: ${ICON_SIZE / 2}px;
    font-size: 12px;
`
