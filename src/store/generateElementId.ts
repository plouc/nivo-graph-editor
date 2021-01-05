import { v4 as uuidV4 } from 'uuid'
import { ElementId } from './types'

export const generateElementId = (): ElementId => uuidV4()
