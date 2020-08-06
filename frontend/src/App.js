import React from 'react';
import styled from 'styled-components'
import HomePage from './components/HomePage';
import { Switch, Route } from 'react-router-dom';
import bgImage from './assets/oval-bg.png'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import axios from 'axios'


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
  }
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
          <Route path="/login" render={(props) => <Login {...props}/> }/>
          <Route path="/signup" component={Signup}/>
        </StyledContainer>
      </Provider>
    </Switch>
  );
}

export default App;
