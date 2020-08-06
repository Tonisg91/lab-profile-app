import styled from 'styled-components'

const StyledSignup = styled.div`
    display: flex;
    height: 100%;
    color: gray;
    h1 {
        color: rgb(150,200,150);
    }
    div {
        width: 50%;
        display: flex;
        flex-direction: column;
    }
    .right{
        align-items: center;
        justify-content: space-around;
    }
    .left-content {
        display: flex;
        flex-direction: column;
        padding: 1em 3em;
        width: 100%
    }
    label {
        margin-top: 1em;
    }
`

export {
    StyledSignup
}