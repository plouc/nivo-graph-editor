import { NodeService } from '../../services_registry'
import registry from '../../registry'

const SeriesXYNodeWidget = () => {
    return <div>Custom</div>
}

export const SeriesXYNodeService: NodeService<'node:series_xy', any> = {
    type: 'node:series_xy',
    category: 'data',
    hasOutput: true,
    properties: [
        {
            name: 'serie_0',
            type: 'property:ref',
            category: 'data',
            accepts: ['node:serie_xy'],
        },
        {
            name: 'serie_1',
            type: 'property:ref',
            category: 'data',
            accepts: ['node:serie_xy'],
        },
    ],
    factory: () => {
        return {}
    },
    //widget: SeriesXYNodeWidget,
    getValue: node => {
        return node.properties.map(property => {
            const propertyService = registry.getPropertyService(property.type)

            // @ts-ignore
            return propertyService.getValue(property, registry)
        })
    },
}
