import { MouseEvent, useCallback } from 'react'
import styled from 'styled-components'
import { useStore, useSelectedNodes, useGraph } from './state'
import {
    AppHeader,
    AppFooter,
    NodesLayer,
    LinkingLayer,
    LinksLayer,
    NodeInfoPanel,
    Sidebar,
    Welcome,
} from './components'

export const App = () => {
    const store = useStore()
    const { nodes, links } = useGraph()
    const selectedNodes = useSelectedNodes()

    const { drag, updateDrag, stopDrag, linking, updateLinking, stopLinking } = store
    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            if (drag.isDragging) {
                updateDrag([event.clientX, event.clientY])
            }
            if (linking.isLinking) {
                updateLinking([event.clientX, event.clientY])
            }
        },
        [drag.isDragging, updateDrag, linking.isLinking, updateLinking]
    )
    const handleMouseOut = useCallback(
        (event: MouseEvent) => {
            if (drag.isDragging) {
                stopDrag()
            }
            if (linking.isLinking) {
                stopLinking()
            }
        },
        [drag.isDragging, stopDrag, linking.isLinking, stopLinking]
    )

    return (
        <>
            <AppHeader />
            <Sidebar nodes={nodes} links={links} />
            <Canvas
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseOut}
                onMouseLeave={handleMouseOut}
            >
                <LinksLayer links={links} />
                <NodesLayer nodes={nodes} />
                <LinkingLayer />
            </Canvas>
            <InfoPanel>
                {selectedNodes.length === 1 && <NodeInfoPanel node={selectedNodes[0]} />}
            </InfoPanel>
            <AppFooter />
            <Welcome />
        </>
    )
}

const Canvas = styled.div`
    position: fixed;
    top: 46px;
    bottom: 52px;
    left: 64px;
    width: calc(100% - 364px);
    height: calc(100% - 82px);
    background: #292929;
    overflow: hidden;
`

const InfoPanel = styled.div`
    position: fixed;
    top: 46px;
    right: 0;
    width: 300px;
    height: 100%;
    background: #111111;
    overflow-y: auto;
`
