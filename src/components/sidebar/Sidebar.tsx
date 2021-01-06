import styled from 'styled-components'
import { ResolvedLink, ResolvedNode } from '../../store'
import { AddNodeButton } from './AddNodeButton'
import { NewGraph } from './NewGraph'
import { SaveGraph } from './SaveGraph'
import { OpenGraph } from './OpenGraph'
import { Settings } from './Settings'

export const Sidebar = ({ nodes, links }: { nodes: ResolvedNode[]; links: ResolvedLink[] }) => {
    return (
        <Container>
            <AddNodeButton />
            <SaveGraph nodes={nodes} links={links} />
            <OpenGraph />
            <NewGraph />
            <Settings />
        </Container>
    )
}

const Container = styled.div`
    position: fixed;
    top: 46px;
    left: 0;
    width: 64px;
    height: 100%;
    background: ${props => props.theme.colors.topDepthBackground};
`
