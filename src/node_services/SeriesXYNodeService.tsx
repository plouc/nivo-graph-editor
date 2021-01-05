import { NodeService } from '../services_registry'

const SeriesXYNodeWidget = () => {
    return <div>Custom</div>
}

export const SeriesXYNodeService: NodeService<'node:series_xy', any> = {
    type: 'node:series_xy',
    category: 'data',
    hasOutput: true,
    properties: [
        {
            type: 'property:ref',
            name: 'serie_0',
            accepts: ['node:serie_xy'],
        },
        {
            type: 'property:ref',
            name: 'serie_1',
            accepts: ['node:serie_xy'],
        },
    ],
    factory: () => {
        return {}
    },
    widget: SeriesXYNodeWidget,
    getValue: (node, registry) => {
        return node.properties.map(property => {
            const propertyService = registry.getPropertyService(property.type)

            // @ts-ignore
            return propertyService.getValue(property, registry)
        })
    },
}
