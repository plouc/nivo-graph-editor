import { NodeService } from '../services_registry'

const SeriesXYNodeWidget = () => {
    return <div>Custom</div>
}

export const SeriesXYNodeService: NodeService<'series_xy', any> = {
    type: 'series_xy',
    category: 'data',
    properties: [
        {
            type: 'ref',
            name: 'serie_0',
            hasInput: true,
        },
        {
            type: 'ref',
            name: 'serie_1',
            hasInput: true,
        },
    ],
    factory: () => {
        return {}
    },
    widget: SeriesXYNodeWidget,
    getValue: (node, registry) => {
        return node.properties.map(property => {
            const propertyService = registry.getPropertyService(property.type)

            return propertyService.getValue(property, registry)
        })
    },
}
