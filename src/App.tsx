import { MouseEvent, useCallback } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { useStore, useSelectedNodes, useGraph } from './store'
import { useCurrentTheme, GlobalStyle } from './theming'
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
    const theme = useCurrentTheme()
    const { nodes, links } = useGraph()
    const selectedNodes = useSelectedNodes()

    const { dragging, updateDrag, stopDrag, linking, updateLinking, stopLinking } = store
    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            if (dragging.isDragging) {
                updateDrag([event.clientX, event.clientY])
            }
            if (linking.isLinking) {
                updateLinking([event.clientX, event.clientY])
            }
        },
        [dragging.isDragging, updateDrag, linking.isLinking, updateLinking]
    )
    const handleMouseOut = useCallback(
        (event: MouseEvent) => {
            if (dragging.isDragging) {
                stopDrag()
            }
            if (linking.isLinking) {
                stopLinking()
            }
        },
        [dragging.isDragging, stopDrag, linking.isLinking, stopLinking]
    )

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
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
        </ThemeProvider>
    )
}

const Canvas = styled.div`
    position: fixed;
    top: 46px;
    bottom: 52px;
    left: 64px;
    width: calc(100% - 424px);
    height: calc(100% - 82px);
    background: ${props => props.theme.colors.background};
    overflow: hidden;
`

const InfoPanel = styled.div`
    position: fixed;
    top: 46px;
    right: 0;
    width: 360px;
    height: 100%;
    background: ${props => props.theme.colors.topDepthBackground};
    overflow-y: auto;
`
