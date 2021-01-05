import { fileOpen, fileSave } from 'browser-nativefs'
import { ResolvedLink, ResolvedNode, serializeElements } from './store'

export const saveAsJSON = async (nodes: ResolvedNode[], links: ResolvedLink[]) => {
    const serialized = serializeElements(nodes, links)
    const stringified = JSON.stringify(
        {
            type: 'nivo-graph',
            version: 'beta',
            ...serialized,
        },
        null,
        2
    )

    const blob = new Blob([stringified], {
        type: 'application/json',
    })

    const fileHandle = await fileSave(
        blob,
        {
            fileName: 'graph',
            description: 'Nivo graph',
            extensions: ['.json'],
        },
        null //appState.fileHandle
    )

    return { fileHandle }
}

export const parseFileContent = async (blob: Blob | File) => {
    let content: string
    if ('text' in Blob) {
        content = await blob.text()
    } else {
        content = await new Promise(resolve => {
            const reader = new FileReader()
            reader.readAsText(blob, 'utf8')
            reader.onloadend = () => {
                if (reader.readyState === FileReader.DONE) {
                    resolve(reader.result as string)
                }
            }
        })
    }

    return JSON.parse(content)
}

export const loadFromJSON = async () => {
    const blob = await fileOpen({
        description: 'Nivo graph files',
        extensions: ['.json', '.nivo'],
        mimeTypes: ['application/json'],
    })

    const content = await parseFileContent(blob)
    if (content.type !== 'nivo-graph') {
        throw new Error('graph file is invalid')
    }

    return content
}
