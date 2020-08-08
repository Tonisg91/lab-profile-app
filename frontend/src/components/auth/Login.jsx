import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'


function Login() {
    const history = useHistory()
    const dispatch = useDispatch()
    const loginForm = useSelector(state => state.loginForm)

    const handleChange = ({target}) => {
        dispatch({
            type: 'SET_LOGIN_FORM',
            ...loginForm, [target.name]: target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = loginForm
        const body = {
            username,
            password
        }
        const {data} = await axios.post('http://localhost:3000/api/auth/login', body)
        localStorage.setItem('loggedInUser', JSON.stringify(data))
        dispatch({
            type: 'USER_LOGIN',
            data
        })
        debugger
        history.push('/profile')
    }

    return(
        
        <div>
            <div className="left">
                <div>
                    <h1>Log in</h1>
                    <form id="loginForm" onSubmit={handleSubmit} >
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            onChange={handleChange} 
                            value={loginForm.username}/>
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" onChange={handleChange} value={loginForm.password}/>
                    </form>
                    <p>If you don't have an account yet, you can create you account <Link to="/signup">here</Link></p>
                </div>
            </div>
            <div className="right">
                <div>
                    <h3>Hello!!</h3>
                    <p>Awesome to have at IronProfile again!</p>
                </div>
                <div>
                    <p>
                        If you signup, you agree with all our terms and conditions
                        where we can do whatever we want with the data!
                    </p>
                    <button type="submit" form="loginForm"> Log In</button>
                </div>
            </div>
        </div>
    )
}

export default Login