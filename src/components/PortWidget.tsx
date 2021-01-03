import { useCallback, MouseEvent } from 'react'
import styled from 'styled-components'
import { ElementId, useStore } from '../state'

const CONTAINER_SIZE = 20
const PORT_SIZE = 10

export const PortWidget = ({
    type,
    elementId,
    position,
}: {
    type: 'source' | 'target'
    elementId: ElementId
    position: [number, number]
}) => {
    const { startLinking, setLinkingPotentialPort, resetLinkingPotentialPort } = useStore()

    const [x, y] = position

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
            style={{
                left: type === 'target' ? 0 : '100%',
            }}
        >
            <Port />
        </Container>
    )
}

const Port = styled.div`
    pointer-events: all;
    width: ${PORT_SIZE}px;
    height: ${PORT_SIZE}px;
    border-radius: ${PORT_SIZE / 2}px;
    background: #111111;
    border: 2px solid pink;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    transition: transform 200ms, box-shadow 200ms;
`

const Container = styled.div`
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
    cursor: pointer;

    &:hover {
        ${Port} {
            transform: scale(1.6);
            box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
        }
    }
`
