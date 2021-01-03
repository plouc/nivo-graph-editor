export type NumberPropertyOptions = {
    name: string
    defaultValue?: number
    hasInput?: boolean
    hasOutput?: boolean
    options?: {
        controlType?: 'number' | 'range'
        min?: number
        max?: number
        step?: number
    }
}

export type NumberProperty = {
    value: number
}
