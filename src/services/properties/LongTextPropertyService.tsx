import { ChangeEvent } from 'react'
import styled from 'styled-components'
import { PropertyService } from '../../services_registry'
import { Property, useStore } from '../../store'

const LongTextPropertyControl = ({
    property,
}: {
    property: Property<'property:long_text', string>
}) => {
    const { updateProperty } = useStore()

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        updateProperty(property.id, {
            data: event.target.value,
        })
    }

    return <TextArea value={property.data} onChange={handleChange} />
}

const TextArea = styled.textarea`
    background-color: ${props => props.theme.colors.inputBackground};
    color: ${props => props.theme.colors.inputText};
    width: 100%;
    height: 120px;
    padding: 6px 9px;

    &:focus {
        outline: none;
    }
`

export const LongTextPropertyService: PropertyService<
    'property:long_text',
    string,
    never,
    string
> = {
    type: 'property:long_text',
    create: spec => ({
        ...spec,
        data: spec.data || '',
    }),
    getValue: property => property.data,
    serialize: property => property.data,
    hydrate: (property, serialized) => ({
        ...property,
        data: serialized,
    }),
    control: LongTextPropertyControl,
}
