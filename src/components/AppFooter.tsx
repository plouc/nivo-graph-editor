import styled from 'styled-components'
import { useLinking } from '../store'

export const AppFooter = () => {
    const linking = useLinking()

    return (
        <Container>
            {linking.isLinking && (
                <div>
                    [{linking.type}]&nbsp;| type: {linking.elementType}&nbsp;|&nbsp;
                    {linking.anchor[0]},{linking.anchor[1]} –&gt; {linking.position[0]},
                    {linking.position[1]}&nbsp;| accepts: {linking.accepts.join(', ')}&nbsp;|
                    potential ID: {linking.potentialId}
                </div>
            )}
        </Container>
    )
}

const Container = styled.footer`
    position: fixed;
    display: flex;
    align-items: center;
    font-size: 12px;
    left: 64px;
    bottom: 0;
    width: calc(100% - 364px);
    height: 36px;
    background-color: ${props => props.theme.colors.mediumDepthBackground};
`
