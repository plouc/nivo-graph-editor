import { groupBy, sortBy } from 'lodash'
import { CreateProperty, Property, ResolvedNode, ResolvedProperty } from './state'

export interface NodeService<Type extends string, Data> {
    type: Type
    category: string
    description?: string
    hasOutput: boolean
    properties: CreateProperty[]
    factory: (data?: Partial<Data>) => Data
    getValue: (node: ResolvedNode, registry: ServiceRegistry) => any
    widget?: (props: { node: ResolvedNode; registry: ServiceRegistry }) => JSX.Element
}

export interface PropertyService<
    Type extends string,
    Options,
    PropertyData = never,
    Value = never
> {
    type: Type
    factory: (options: Options) => CreateProperty
    serialize: (property: ResolvedProperty) => any
    hydrate: (property: Property, data: any) => Property
    getValue: (property: PropertyData, registry: ServiceRegistry) => Value
    widget?: (props: { property: Property & PropertyData }) => JSX.Element
    control?: (props: { property: Property & PropertyData }) => JSX.Element
}

export class ServiceRegistry {
    nodeServices: Record<string, NodeService<string, any>>
    propertyServices: Record<string, PropertyService<string, any, any, any>>

    constructor() {
        this.nodeServices = {}
        this.propertyServices = {}
    }

    registerNodeService(nodeService: NodeService<string, any>) {
        if (nodeService.type.indexOf('node:') !== 0) {
            throw new Error(
                `a node service type should use a 'node:' prefix, got: '${nodeService.type}'`
            )
        }

        this.nodeServices[nodeService.type] = nodeService

        return this
    }

    getNodeService(nodeType: string): NodeService<string, any> {
        const nodeService = this.nodeServices[nodeType]
        if (!nodeService) {
            throw new Error(`no node service defined for: ${nodeType}`)
        }

        return nodeService
    }

    getNodeServiceCategories() {
        const grouped = Object.entries(groupBy(this.nodeServices, 'category'))
        const sorted = sortBy(grouped, group => group[0])

        return sorted.map(group => ({
            category: group[0],
            types: sortBy(group[1], 'type'),
        }))
    }

    registerPropertyService(propertyService: PropertyService<any, any, any, any>) {
        if (propertyService.type.indexOf('property:') !== 0) {
            throw new Error(
                `a property service type should use a 'property:' prefix, got: '${propertyService.type}'`
            )
        }

        this.propertyServices[propertyService.type] = propertyService

        return this
    }

    getPropertyService(propertyType: string): PropertyService<any, any, any, any> {
        const propertyService = this.propertyServices[propertyType]
        if (!propertyService) {
            throw new Error(`no property service defined for: ${propertyType}`)
        }

        return propertyService
    }

    resolvePropertyValue(property: ResolvedProperty, ownValue?: any) {
        const { input } = property
        if (!input) {
            return ownValue
        }

        if (input.elementType === 'property') {
            return this.getPropertyService(input.type).getValue(input, this)
        }

        if (input.elementType === 'node') {
            return this.getNodeService(input.type).getValue(input, this)
        }
    }
}
