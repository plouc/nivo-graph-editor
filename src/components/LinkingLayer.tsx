import styled from 'styled-components'
import { FaChevronRight, FaCheck } from 'react-icons/fa'
import { useStore } from '../state'
import { ReactNode } from 'react'

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
    let iconColor = 'pink'
    if (linking.potentialId) {
        icon = <FaCheck />
        iconColor = '#65f7cf'
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
            <line
                strokeWidth={3}
                stroke="pink"
                strokeLinecap="round"
                x1={linking.anchor[0]}
                x2={linking.position[0]}
                y1={linking.anchor[1]}
                y2={linking.position[1]}
            />
            <circle cx={linking.position[0]} cy={linking.position[1]} r={4} fill="pink" />
            <foreignObject x={iconPosition[0]} y={iconPosition[1]} width={24} height={24}>
                <Icon
                    style={{
                        color: iconColor,
                        borderColor: iconColor,
                    }}
                >
                    {icon}
                </Icon>
            </foreignObject>
        </svg>
    )
}

const Icon = styled.div`
    width: ${ICON_SIZE}px;
    height: ${ICON_SIZE}px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000000;
    border: 2px solid;
    border-radius: ${ICON_SIZE / 2}px;
    font-size: 12px;
`
