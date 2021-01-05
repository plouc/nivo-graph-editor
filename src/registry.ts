import { ServiceRegistry } from './services_registry'
import * as node from './node_services'
import * as property from './property_services'

const propertyServiceMap = {
    'property:angle': property.AnglePropertyService,
    'property:array_string': property.ArrayStringPropertyService,
    'property:array_xy': property.ArrayXYPropertyService,
    'property:choices': property.ChoicesPropertyService,
    'property:blend_mode': property.BlendModePropertyService,
    'property:custom': property.CustomPropertyService,
    'property:matrix': property.MatrixPropertyService,
    'property:number': property.NumberPropertyService,
    'property:ref': property.RefPropertyService,
    'property:text': property.TextPropertyService,
}
export type PropertyServiceMap = typeof propertyServiceMap
export type PropertyType = keyof PropertyServiceMap

const nodeServiceMap = {
    'node:area_bump': node.AreaBumpNodeService,
    'node:axis': node.AxisNodeService,
    'node:blend_mode': node.BlendModeNodeService,
    'node:canvas': node.CanvasNodeService,
    'node:chord': node.ChordNodeService,
    'node:color_scheme': node.ColorSchemeNodeService,
    'node:line': node.LineNodeService,
    'node:margin': node.MarginNodeService,
    'node:matrix': node.MatrixNodeService,
    'node:nivo_theme': node.NivoThemeNodeService,
    'node:scatterplot': node.ScatterPlotNodeService,
    'node:serie_xy': node.SerieXYNodeService,
    'node:series_xy': node.SeriesXYNodeService,
}
export type NodeServiceMap = typeof nodeServiceMap
export type NodeType = keyof NodeServiceMap

const servicesRegistry = new ServiceRegistry(nodeServiceMap, propertyServiceMap)

export default servicesRegistry
