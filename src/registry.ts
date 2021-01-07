import { ServiceRegistry } from './services_registry'
import * as service from './services'

const propertyServiceMap = {
    [service.AnglePropertyService.type]: service.AnglePropertyService,
    [service.ArrayStringPropertyService.type]: service.ArrayStringPropertyService,
    [service.ArrayValueLinkPropertyService.type]: service.ArrayValueLinkPropertyService,
    [service.ArrayXYPropertyService.type]: service.ArrayXYPropertyService,
    [service.ChoicesPropertyService.type]: service.ChoicesPropertyService,
    [service.BlendModePropertyService.type]: service.BlendModePropertyService,
    [service.CustomPropertyService.type]: service.CustomPropertyService,
    [service.MatrixPropertyService.type]: service.MatrixPropertyService,
    [service.NumberPropertyService.type]: service.NumberPropertyService,
    [service.LongTextPropertyService.type]: service.LongTextPropertyService,
    [service.RefPropertyService.type]: service.RefPropertyService,
    [service.TextPropertyService.type]: service.TextPropertyService,
}
export type PropertyServiceMap = typeof propertyServiceMap
export type PropertyType = keyof PropertyServiceMap

const nodeServiceMap = {
    [service.AreaBumpNodeService.type]: service.AreaBumpNodeService,
    [service.AxisNodeService.type]: service.AxisNodeService,
    [service.BlendModeNodeService.type]: service.BlendModeNodeService,
    [service.CanvasNodeService.type]: service.CanvasNodeService,
    [service.ChordNodeService.type]: service.ChordNodeService,
    [service.ColorSchemeNodeService.type]: service.ColorSchemeNodeService,
    [service.LineNodeService.type]: service.LineNodeService,
    [service.MarginNodeService.type]: service.MarginNodeService,
    [service.MatrixNodeService.type]: service.MatrixNodeService,
    [service.NivoThemeNodeService.type]: service.NivoThemeNodeService,
    [service.NoteNodeService.type]: service.NoteNodeService,
    [service.SankeyDataNodeService.type]: service.SankeyDataNodeService,
    [service.SankeyNodeService.type]: service.SankeyNodeService,
    [service.ScatterPlotNodeService.type]: service.ScatterPlotNodeService,
    [service.SerieXYNodeService.type]: service.SerieXYNodeService,
    [service.SeriesXYNodeService.type]: service.SeriesXYNodeService,
    [service.ValueLinksNodeService.type]: service.ValueLinksNodeService,
}
export type NodeServiceMap = typeof nodeServiceMap
export type NodeType = keyof NodeServiceMap

const servicesRegistry = new ServiceRegistry(propertyServiceMap, nodeServiceMap)

export default servicesRegistry
