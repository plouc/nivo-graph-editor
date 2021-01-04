import styled from 'styled-components'

export const AppHeader = () => {
    return <Header>{/*<Title>nivo graph editor</Title>*/}</Header>
}

const Header = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 46px;
    background-color: ${props => props.theme.colors.mediumDepthBackground};
    display: flex;
    align-items: center;
    padding-left: 64px;
`

/*
const Title = styled.h1`
    margin: 0;
    padding: 0;
    font-size: 14px;
    color: ${props => props.theme.colors.accentColor};
    text-transform: uppercase;
`
*/
