import { useCallback, MouseEvent, memo } from 'react'
import styled, { css } from 'styled-components'
import { ElementId, useLinkingActions, useLinking } from '../store'
import { getCategoryColor } from '../theming'

const CONTAINER_SIZE = 20
const PORT_SIZE = 10

export const PortWidget = memo(
    ({
        type,
        elementId,
        x,
        y,
        category = 'default',
    }: {
        type: 'source' | 'target'
        elementId: ElementId
        x: number
        y: number
        category?: string
    }) => {
        const { type: linkingType, isLinking, potentialId } = useLinking()
        const {
            startLinking,
            setLinkingPotentialPort,
            resetLinkingPotentialPort,
        } = useLinkingActions()

        const handleLinking = useCallback(
            (event: MouseEvent) => {
                event.stopPropagation()

                startLinking({
                    elementId,
                    type,
                    anchor: [x, y],
                    initial: [event.clientX, event.clientY],
                })
            },
            [startLinking, elementId, type, x, y]
        )

        const handleMouseEnter = useCallback(() => {
            setLinkingPotentialPort(elementId, type)
        }, [setLinkingPotentialPort, elementId, type])

        const handleMouseLeave = useCallback(() => {
            resetLinkingPotentialPort()
        }, [resetLinkingPotentialPort])

        return (
            <Container
                onMouseDown={handleLinking}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                isLinking={isLinking}
                isHighlighted={potentialId === elementId && linkingType !== type}
                style={{
                    left: type === 'target' ? 0 : '100%',
                }}
            >
                <Port category={category} />
            </Container>
        )
    }
)

const Port = styled.div<{
    category: string
}>`
    pointer-events: all;
    width: ${PORT_SIZE}px;
    height: ${PORT_SIZE}px;
    border-radius: ${PORT_SIZE / 2}px;
    background: ${props => props.theme.colors.background};
    border: 2px solid ${props => getCategoryColor(props.category, props.theme)};
    transition: transform 200ms;
`

const Container = styled.div<{
    isLinking: boolean
    isHighlighted: boolean
}>`
    pointer-events: all;
    position: absolute;
    top: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${CONTAINER_SIZE}px;
    height: ${CONTAINER_SIZE}px;
    margin-top: -${CONTAINER_SIZE / 2}px;
    margin-left: -${CONTAINER_SIZE / 2}px;
    cursor: crosshair;

    ${Port} {
        transform: scale(${props => (props.isHighlighted ? 1.6 : 1)});
    }

    ${props =>
        !props.isLinking
            ? css`
                  &:hover {
                      transform: scale(1.6);
                  }
              `
            : undefined};
`
