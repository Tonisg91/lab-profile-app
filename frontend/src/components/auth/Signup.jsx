import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { StyledSignup } from './StyledComponents'


function Signup() {

    const dispatch = useDispatch()
    const signupForm = useSelector(state => state.signupForm)

    const handleChange = ({target}) => {
        dispatch({
            type: 'SET_SIGNUP_FORM',
            ...signupForm, [target.name]: target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const {username, password, course, campus} = signupForm
        const body = {
            username,
            password,
            campus,
            course
        }
        dispatch({
            type: 'CREATE_ACCOUNT',
            body
        })
    }


    return (
        <StyledSignup>
            <div className="left">
                <div className="left-content">
                    <h1>
                        Signup
                    </h1>
                    <form onSubmit={handleSubmit} id="SignupForm">
                        <div>
                            <label id="SignupForm" htmlFor="username">Username</label>
                            <input type="text" name="username" value={signupForm.username} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={signupForm.password} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="campus">Campus</label>
                            <input type="text" name="campus" value={signupForm.campus} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="course">Course</label>
                            <input type="text" name="course" value={signupForm.course} onChange={handleChange}/>
                        </div>
                    </form>
                </div>
            </div>
            <div className="right">
                <div >
                    <h3>Hello!!!</h3>
                    <p>Welcome to IronProfile</p>
                </div>
                <div>
                    <p>
                        If you signup, you agree with all our terms and 
                        conditions where we can do whatever we want with the data!
                    </p>
                    <button type="submit" form="SignupForm">
                        Create Account
                    </button>
                </div>
            </div>
        </StyledSignup>
    )
}

export default Signup