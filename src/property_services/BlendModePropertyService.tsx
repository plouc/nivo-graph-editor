import { PropertyService } from '../services_registry'
import {
    ChoicesPropertyOptions,
    ChoiceProperty,
    ChoicesPropertyService,
    ChoicesPropertyControl,
} from './ChoicesPropertyService'

const blendModeChoices = [
    { label: 'normal', value: 'normal' },
    { label: 'multiply', value: 'multiply' },
    { label: 'screen', value: 'screen' },
    { label: 'overlay', value: 'overlay' },
    { label: 'darken', value: 'darken' },
    { label: 'lighten', value: 'lighten' },
    { label: 'color-dodge', value: 'color-dodge' },
    { label: 'color-burn', value: 'color-burn' },
    { label: 'hard-light', value: 'hard-light' },
    { label: 'soft-light', value: 'soft-light' },
    { label: 'difference', value: 'difference' },
    { label: 'exclusion', value: 'exclusion' },
    { label: 'hue', value: 'hue' },
    { label: 'saturation', value: 'saturation' },
    { label: 'color', value: 'color' },
    { label: 'luminosity', value: 'luminosity' },
]

export const BlendModePropertyService: PropertyService<
    'blend_mode',
    ChoicesPropertyOptions,
    ChoiceProperty,
    string | number
> = {
    type: 'blend_mode',
    factory: ({ name, defaultValue, hasInput = false, hasOutput = false }: any) =>
        ChoicesPropertyService.factory({
            name,
            defaultValue,
            hasInput,
            hasOutput,
            choices: blendModeChoices,
        }),
    serialize: ChoicesPropertyService.serialize,
    hydrate: (property, data) => {
        return {
            ...property,
            value: data,
            choices: blendModeChoices,
        }
    },
    getValue: ChoicesPropertyService.getValue,
    control: ChoicesPropertyControl,
}
