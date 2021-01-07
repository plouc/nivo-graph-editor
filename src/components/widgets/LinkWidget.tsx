import { useCallback, useMemo, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { line as d3Line, curveBasis } from 'd3-shape'
import { FaTimes } from 'react-icons/fa'
import { ResolvedLink, useSettings, useStore } from '../../store'
import { getCategoryColor } from '../../theming'
import registry from '../../registry'

const lineGenerator = d3Line().curve(curveBasis)

const UNLINK_BUTTON_SIZE = 18

export const LinkWidget = ({ link }: { link: ResolvedLink }) => {
    const { animateLinks, discreteLinks } = useSettings()
    const { source, target } = link

    const sourceElementType = source.elementType

    const sourceX = source.x
    const sourceY = source.y
    const sourceWidth = source.width
    const sourceHeight = source.height

    const targetX = target.x
    const targetY = target.y
    const targetHeight = target.height

    const [path, center] = useMemo(() => {
        if (
            sourceX === undefined ||
            sourceY === undefined ||
            sourceWidth === undefined ||
            sourceHeight === undefined ||
            targetX === undefined ||
            targetY === undefined ||
            targetHeight === undefined
        ) {
            return [null, null]
        }

        const sourcePosition: [number, number] = [
            sourceX + sourceWidth,
            sourceY + (sourceElementType === 'property' ? sourceHeight / 2 : 12),
        ]
        const targetPosition: [number, number] = [targetX, targetY + targetHeight / 2]

        const xDistance = targetPosition[0] - sourcePosition[0]
        const yDistance = targetPosition[1] - sourcePosition[1]

        const center: [number, number] = [
            sourcePosition[0] + xDistance / 2,
            sourcePosition[1] + yDistance / 2,
        ]

        const xOffset = Math.max(6, Math.min(42, Math.abs(xDistance) * 0.2))

        const points: [number, number][] = [sourcePosition]
        points.push([sourcePosition[0] + xOffset, sourcePosition[1]])
        points.push(center)
        points.push([targetPosition[0] - xOffset, targetPosition[1]])
        points.push(targetPosition)

        return [lineGenerator(points), center]
    }, [
        sourceElementType,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        targetX,
        targetY,
        targetHeight,
    ])

    const [isHover, setIsHover] = useState(false)
    const handleHover = useCallback(() => {
        setIsHover(true)
    }, [setIsHover])
    const handleOut = useCallback(() => {
        setIsHover(false)
    }, [setIsHover])

    const { unlink } = useStore()
    const sourceId = source.id
    const targetId = target.id
    const handleUnlink = useCallback(() => {
        unlink(sourceId, targetId)
    }, [unlink, sourceId, targetId])

    if (!path || !center) {
        return null
    }

    let category: string = 'default'
    if (source.elementType === 'property') {
        if (source.category) {
            category = source.category
        }
    } else if (source.elementType === 'node') {
        const nodeService = registry.getNodeService(source.type)
        if (nodeService) {
            category = nodeService.category
        }
    }

    return (
        <Container category={category} discreteLinks={discreteLinks}>
            <Path d={path} isHover={isHover} animate={animateLinks} />
            {!isHover && <Circle cx={center[0]} cy={center[1]} r={4} />}
            <CapturePath d={path} onMouseEnter={handleHover} onMouseLeave={handleOut} />
            {isHover && (
                <foreignObject
                    x={center[0] - UNLINK_BUTTON_SIZE / 2}
                    y={center[1] - UNLINK_BUTTON_SIZE / 2}
                    width={UNLINK_BUTTON_SIZE}
                    height={UNLINK_BUTTON_SIZE}
                >
                    <UnlinkButton
                        onMouseEnter={handleHover}
                        onMouseLeave={handleOut}
                        onClick={handleUnlink}
                    >
                        <FaTimes />
                    </UnlinkButton>
                </foreignObject>
            )}
        </Container>
    )
}

const Container = styled.g<{
    discreteLinks: boolean
    category: string
}>`
    color: ${props =>
        props.discreteLinks
            ? props.theme.colors.discreteLink
            : getCategoryColor(props.category, props.theme)};
`

const CapturePath = styled.path`
    pointer-events: all;
    fill: none;
    stroke: rgba(255, 255, 255, 0);
    stroke-width: 8px;
`

const flowAnimation = keyframes`
    to {
        stroke-dashoffset: -1000;
    }
`

const Path = styled.path<{
    isHover: boolean
    animate: boolean
}>`
    fill: none;
    stroke: currentColor;
    stroke-width: ${props => (props.isHover ? 3 : 1)}px;
    ${props =>
        props.animate
            ? css`
                  stroke-dasharray: 4 6;
                  animation: ${flowAnimation} 20s linear infinite;
              `
            : ''}
`

const UnlinkButton = styled.div`
    pointer-events: all;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${UNLINK_BUTTON_SIZE}px;
    height: ${UNLINK_BUTTON_SIZE}px;
    border-radius: ${UNLINK_BUTTON_SIZE / 2}px;
    cursor: pointer;
    background-color: ${props => props.theme.colors.background};
    border: 2px solid currentColor;
    font-size: 10px;
`

const Circle = styled.circle`
    fill: ${props => props.theme.colors.background};
    stroke: currentColor;
    stroke-width: 2px;
`
