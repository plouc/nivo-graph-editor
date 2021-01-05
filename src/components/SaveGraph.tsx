import { MdSave } from 'react-icons/md'
import { ResolvedLink, ResolvedNode } from '../store'
import { saveAsJSON } from '../fs'
import { SidebarButton } from './SidebarButton'

interface SaveProps {
    nodes: ResolvedNode[]
    links: ResolvedLink[]
}

export const SaveGraph = ({ nodes, links }: SaveProps) => {
    const handleSave = () => {
        saveAsJSON(nodes, links)
    }

    return (
        <SidebarButton onClick={handleSave}>
            <MdSave />
        </SidebarButton>
    )
}
