import { line as d3Line, curveBasis } from 'd3-shape'
import { ResolvedLink } from '../state'

const LINK_ENDINGS_OFFSET = 32

const lineGenerator = d3Line().curve(curveBasis)

export const LinkWidget = ({ link }: { link: ResolvedLink }) => {
    if (
        link.source.x === undefined ||
        link.source.width === undefined ||
        link.source.y === undefined ||
        link.source.height === undefined ||
        link.target.x === undefined ||
        link.target.y === undefined ||
        link.target.height === undefined
    ) {
        return null
    }

    const xDistance = link.target.x - (link.source.x + +link.source.width)
    const shouldAddOffset = Math.abs(xDistance) > LINK_ENDINGS_OFFSET * 2

    const points: [number, number][] = []
    points.push([link.source.x + link.source.width, link.source.y])

    if (link.source.elementType === 'property') {
        points[0][1] += link.source.height / 2
    } else {
        points[0][1] += 12
    }

    if (shouldAddOffset) {
        points.push([points[0][0] + LINK_ENDINGS_OFFSET, points[0][1]])
    }

    const yDistance = link.target.y + link.target.height / 2 - points[0][1]
    const midPoint: [number, number] = [points[0][0] + xDistance / 2, points[0][1] + yDistance / 2]
    points.push(midPoint)

    if (shouldAddOffset) {
        points.push([link.target.x - LINK_ENDINGS_OFFSET, link.target.y + link.target.height / 2])
    }

    points.push([link.target.x, link.target.y + link.target.height / 2])

    return (
        <>
            <path
                fill="none"
                stroke="pink"
                strokeWidth={2}
                d={lineGenerator(points) ?? undefined}
            />
            <circle cx={midPoint[0]} cy={midPoint[1]} r={5} stroke="pink" strokeWidth={2} />
        </>
    )
}
