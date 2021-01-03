import { createElement } from 'react'
import { ResolvedProperty } from '../state'
import registry from '../registry'
import { PropertyWidget } from './PropertyWidget'

export const PropertiesWidget = ({ properties }: { properties: ResolvedProperty[] }) => {
    return (
        <>
            {properties.map(property => {
                const propertyService = registry.propertyServices[property.type]
                const hasCustomWidget = propertyService && 'widget' in propertyService

                if (!hasCustomWidget) {
                    return <PropertyWidget key={property.name} property={property} />
                }

                return createElement(propertyService.widget!, { property })
            })}
        </>
    )
}
