import styled from 'styled-components'

export const Input = styled.input`
    border: none;
    padding: 3px 6px;
    border-radius: 2px;
    font-family: inherit;
    background-color: #333333;
    color: #eeeeee;
    font-size: 12px;
    cursor: pointer;

    &:focus {
        outline: 0;
        background-color: #bbbbbb;
        color: #000000;
        cursor: auto;
    }
`
