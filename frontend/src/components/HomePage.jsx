import React from 'react'
import bgImage from '../assets/oval-bg.png'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const StyledHomePage = styled.div`
    /* width: 717px;
    height: 458px;
    background-image: url(${bgImage});
    background-repeat: no-repeat;
    background-size: auto; */
`

function HomePage () {
    return (
        <StyledHomePage>
            <div>
                <h1>IronProfile</h1>
                <p>Today we will create an app with authoritation, adding some cool styles!</p>
            </div>
            <div className="btn-container">
                <Link to="/signup">
                    <button>Signup</button>
                </Link>
                <Link to="/login">
                    <button>Login</button>
                </Link>
            </div>
        </StyledHomePage>
    )
}

export default HomePage