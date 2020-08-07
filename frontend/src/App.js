import React from 'react';
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom';
import bgImage from './assets/oval-bg.png'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import axios from 'axios'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup'
import HomePage from './components/HomePage';
import Profile from './components/Profile'

const StyledContainer = styled.main`
  width: 717px;
  height: 458px;
  background-image: url(${bgImage});
  background-repeat: no-repeat;
  background-size: auto;
`

const createAccount = data => {
  axios.post('http://localhost:3000/api/auth/signup', data).then(resp => console.log(resp))
}

const userLogin = data => {
  axios.post('http://localhost:3000/api/auth/login', data)
        .then(({data}) => {
          localStorage.setItem('loggedInUser', JSON.stringify(data))
        })
}

const initialState = {
  loginForm: {
    username: '',
    password: ''
  },
  signupForm: {
    username: '',
    password: '',
    campus: '',
    course: ''
  },
  loggedInUser: JSON.parse(localStorage.getItem('loggedInUser')) || null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOGIN_FORM':
      return {...state, loginForm: action }
    case 'SET_SIGNUP_FORM':
      return {...state, signupForm: action}
    case 'CREATE_ACCOUNT':
      createAccount(action.body)
      return {...state, signupForm: initialState.signupForm}
    case 'USER_LOGIN':
      userLogin(action.body)
      return {...state, loginForm: initialState.loginForm}
    // case 'GET_USERDATA':
    //   console.log(action)
    //   return {...state, loggedInUser: action}
    default: 
      return state
  }
}

const store = createStore(reducer, initialState)

function App() {
  return (
    <Switch>
      <Provider store={store}>
        <StyledContainer>
          <Route exact path="/" component={HomePage}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/profile" component={Profile} />
        </StyledContainer>
      </Provider>
    </Switch>
  );
}

export default App;
