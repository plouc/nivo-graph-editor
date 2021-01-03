import { State, isProperty } from './types'
import { useStore } from './store'

export const propertiesSelector = (state: State) => state.elements.filter(isProperty)

export const useProperties = () => useStore(propertiesSelector)
