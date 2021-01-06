import { ServiceRegistry } from './services_registry'
import * as service from './services'

const propertyServiceMap = {
    'property:angle': service.AnglePropertyService,
    'property:array_string': service.ArrayStringPropertyService,
    'property:array_value_link': service.ArrayValueLinkPropertyService,
    'property:array_xy': service.ArrayXYPropertyService,
    'property:choices': service.ChoicesPropertyService,
    'property:blend_mode': service.BlendModePropertyService,
    'property:custom': service.CustomPropertyService,
    'property:matrix': service.MatrixPropertyService,
    'property:number': service.NumberPropertyService,
    'property:ref': service.RefPropertyService,
    'property:text': service.TextPropertyService,
}
export type PropertyServiceMap = typeof propertyServiceMap
export type PropertyType = keyof PropertyServiceMap

const nodeServiceMap = {
    'node:area_bump': service.AreaBumpNodeService,
    'node:axis': service.AxisNodeService,
    'node:blend_mode': service.BlendModeNodeService,
    'node:canvas': service.CanvasNodeService,
    'node:chord': service.ChordNodeService,
    'node:color_scheme': service.ColorSchemeNodeService,
    'node:line': service.LineNodeService,
    'node:margin': service.MarginNodeService,
    'node:matrix': service.MatrixNodeService,
    'node:nivo_theme': service.NivoThemeNodeService,
    'node:sankey_data': service.SankeyDataNodeService,
    'node:sankey': service.SankeyNodeService,
    'node:scatterplot': service.ScatterPlotNodeService,
    'node:serie_xy': service.SerieXYNodeService,
    'node:series_xy': service.SeriesXYNodeService,
    'node:value_links': service.ValueLinksNodeService,
}
export type NodeServiceMap = typeof nodeServiceMap
export type NodeType = keyof NodeServiceMap

const servicesRegistry = new ServiceRegistry(propertyServiceMap, nodeServiceMap)

export default servicesRegistry
