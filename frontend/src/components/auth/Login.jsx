import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

function Login() {
    return(
        <div>
            <h1>Login</h1>
            <Link to="/">
                Home
            </Link>
        </div>
    )
}

export default Login