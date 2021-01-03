import { useEffect } from 'react'

/**
 * This hook can be used to attach event listener to the document,
 * it will take care of removing/updating the listener if it changes,
 * and will also remove the listener when the component it's attached
 * to is unmounted.
 */
export const useDocumentEventListener = <K extends keyof DocumentEventMap>(
    eventType: K,
    listener: (this: Document, event: DocumentEventMap[K]) => any
) => {
    useEffect(() => {
        document.addEventListener(eventType, listener)

        return () => {
            document.removeEventListener(eventType, listener)
        }
    }, [listener])
}
