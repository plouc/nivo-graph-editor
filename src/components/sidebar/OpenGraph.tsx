import { useCallback } from 'react'
import { MdFolderOpen } from 'react-icons/md'
import { loadFromJSON } from '../../fs'
import { useStore } from '../../store'
import { SidebarButton } from './SidebarButton'

export const OpenGraph = () => {
    const { loadGraph } = useStore()

    const handleOpen = useCallback(() => {
        loadFromJSON().then(graph => {
            loadGraph(graph)
        })
    }, [loadGraph])

    return (
        <SidebarButton onClick={handleOpen}>
            <MdFolderOpen />
        </SidebarButton>
    )
}
