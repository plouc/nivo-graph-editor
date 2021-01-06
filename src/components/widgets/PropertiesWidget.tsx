import { createElement, memo } from 'react'
import { ResolvedProperty } from '../../store'
import registry from '../../registry'
import { PropertyWidget } from './PropertyWidget'

export const PropertiesWidget = memo(({ properties }: { properties: ResolvedProperty[] }) => {
    return (
        <>
            {properties.map(property => {
                const propertyService = registry.getPropertyService(property.type)

                if (!('widget' in propertyService)) {
                    return <PropertyWidget key={property.name} property={property} />
                }

                // @ts-ignore
                return createElement(propertyService.widget, { property })
            })}
        </>
    )
})
