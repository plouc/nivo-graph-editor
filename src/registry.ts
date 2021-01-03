import { ServiceRegistry } from './services_registry'
import {
    AreaBumpNodeService,
    AxisNodeService,
    BlendModeNodeService,
    CanvasNodeService,
    ChordNodeService,
    ColorSchemeNodeService,
    LineNodeService,
    MarginNodeService,
    MatrixNodeService,
    NivoThemeNodeService,
    ScatterPlotNodeService,
    SerieXYNodeService,
    SeriesXYNodeService,
} from './node_services'
import {
    AnglePropertyService,
    ArrayStringPropertyService,
    ArrayXYPropertyService,
    BlendModePropertyService,
    ChoicesPropertyService,
    CustomPropertyService,
    MatrixPropertyService,
    NumberPropertyService,
    RefPropertyService,
    TextPropertyService,
} from './property_services'

const servicesRegistry = new ServiceRegistry()

servicesRegistry
    .registerNodeService(AreaBumpNodeService)
    .registerNodeService(AxisNodeService)
    .registerNodeService(BlendModeNodeService)
    .registerNodeService(CanvasNodeService)
    .registerNodeService(ChordNodeService)
    .registerNodeService(ColorSchemeNodeService)
    .registerNodeService(LineNodeService)
    .registerNodeService(MarginNodeService)
    .registerNodeService(MatrixNodeService)
    .registerNodeService(NivoThemeNodeService)
    .registerNodeService(ScatterPlotNodeService)
    .registerNodeService(SerieXYNodeService)
    .registerNodeService(SeriesXYNodeService)

servicesRegistry
    .registerPropertyService(AnglePropertyService)
    .registerPropertyService(ArrayStringPropertyService)
    .registerPropertyService(ArrayXYPropertyService)
    .registerPropertyService(BlendModePropertyService)
    .registerPropertyService(ChoicesPropertyService)
    .registerPropertyService(CustomPropertyService)
    .registerPropertyService(MatrixPropertyService)
    .registerPropertyService(NumberPropertyService)
    .registerPropertyService(RefPropertyService)
    .registerPropertyService(TextPropertyService)

export default servicesRegistry
