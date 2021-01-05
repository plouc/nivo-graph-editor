import { groupBy, sortBy } from 'lodash'
import {
    CreateProperty,
    generateElementId,
    Property,
    PropertySpec,
    ResolvedNode,
    ResolvedProperty,
} from './store'
import { NodeType, NodeServiceMap, PropertyType, PropertyServiceMap } from './registry'

export interface NodeService<Type extends NodeType = NodeType, Data = any> {
    type: Type
    category: string
    description?: string
    hasOutput: boolean
    properties: PropertySpec[]
    factory: (data?: Partial<Data>) => Data
    getValue: (node: ResolvedNode<Type>) => any
    widget?: (props: { node: ResolvedNode<Type> }) => JSX.Element
}

export interface PropertyService<
    Type extends PropertyType = PropertyType,
    Data = any,
    Options = any,
    Value = any,
    SerializedValue = Value
> {
    type: Type
    create: (propertySpec: PropertySpec<Type, Data, Options>) => PropertySpec<Type, Data, Options>
    getValue: (property: ResolvedProperty<Type, Data, Options>) => Value
    serialize: (property: ResolvedProperty<Type, Data, Options>) => SerializedValue
    hydrate: (
        property: Property<Type, Data, Options>,
        serializedValue: SerializedValue
    ) => Property<Type, Data, Options>
    widget?: (props: { property: Property<Type, Data, Options> }) => JSX.Element
    control?: (props: { property: Property<Type, Data, Options> }) => JSX.Element
}

export class ServiceRegistry {
    private readonly propertyServices: PropertyServiceMap
    private readonly nodeServices: NodeServiceMap

    constructor(properties: PropertyServiceMap, nodes: NodeServiceMap) {
        this.propertyServices = properties
        this.nodeServices = nodes
    }

    getNodeService(nodeType: NodeType): NodeServiceMap[NodeType] {
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

    getPropertyService<Type extends PropertyType = PropertyType>(
        propertyType: Type
    ): PropertyServiceMap[Type] {
        const propertyService = this.propertyServices[propertyType]
        if (!propertyService) {
            throw new Error(`no property service defined for: ${propertyType}`)
        }

        return propertyService
    }

    createProperty(propertySpec: PropertySpec) {
        const propertyService = this.getPropertyService(propertySpec.type)

        const property: CreateProperty = {
            elementType: 'property',
            id: generateElementId(),
            accepts: [],
            hasOutput: false,
            data: undefined,
            options: {},
            // @ts-ignore
            ...propertyService.create(propertySpec),
        }

        return property
    }

    resolvePropertyValue<Type extends PropertyType = PropertyType>(
        property: ResolvedProperty<Type>,
        ownValue?: any
    ) {
        const { input } = property
        if (!input) {
            return ownValue
        }

        if (input.elementType === 'property') {
            // @ts-ignore
            return this.getPropertyService(input.type).getValue(input, this)
        }

        if (input.elementType === 'node') {
            // @ts-ignore
            return this.getNodeService(input.type).getValue(input, this)
        }
    }

    resolvePropertyValues(properties: ResolvedProperty[]) {
        const resolved: any = {}
        properties.forEach(property => {
            resolved[property.name] = this.getPropertyService(property.type)
                // @ts-ignore
                .getValue(property, this)
        })

        return resolved
    }
}
