import {compose} from 'recompose'
import withRedirectUser from '../hocs/redirect-user'
import React, {Component} from 'react'
import Local from './login-local'
import Facebook from './login-facebook'
import Google from './login-google'

const LoginComponent = () => (
    <div style={{
        maxWidth: '300px',
        margin: 'auto'
    }}>
        <h1>Log in</h1>
        <Local/>
        <p style={{
            textAlign: 'center'
        }}>or</p>
        <Facebook/>
        <Google/>
        <p>New user? <a href="/register">register</a>.</p>
    </div>
)
const Login = compose(
    withRedirectUser
)(LoginComponent)

export default Login

