import { PropertyService } from '../../services_registry'

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
    'property:blend_mode',
    string,
    {},
    string
> = {
    type: 'property:blend_mode',
    create: spec => ({
        ...spec,
        data: 'normal',
    }),
    getValue: property => property.data,
    serialize: property => property.data,
    hydrate: (property, serialized) => ({
        ...property,
        data: serialized,
    }),
    control: () => <div>BlendModePropertyControl</div>,
}
