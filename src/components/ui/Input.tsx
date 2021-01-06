import styled from 'styled-components'

export const Input = styled.input`
    border: none;
    padding: 3px 6px;
    border-radius: 2px;
    font-family: inherit;
    background-color: ${props => props.theme.colors.inputBackground};
    color: ${props => props.theme.colors.inputText};
    font-size: 12px;
    cursor: pointer;

    &[type='number'] {
        text-align: right;
    }

    &:focus {
        outline: 0;
        background-color: #bbbbbb;
        color: #000000;
        cursor: auto;
    }
`
