import { State, isLink } from './types'
import { useStore } from './store'

const linksSelector = (state: State) => state.elements.filter(isLink)

export const useLinks = () => useStore(linksSelector)
