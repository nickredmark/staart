import React, {Component} from 'react'
import withRedirectUser from '../hocs/redirect-user'
import {compose} from 'recompose'
import Local from './register-local'
import Facebook from './login-facebook'
import Google from './login-google'

const RegisterComponent = () => (
    <div style={{
        maxWidth: '300px',
        margin: 'auto'
    }}>
        <h1>Register</h1>
        <Local/>
        <p style={{
            textAlign: 'center'
        }}>or</p>
        <Facebook label="Register with Facebook"/>
        <Google label="Register with Google"/>
        <p>Already have an account? <a href="/login">Log in</a>.</p>
    </div>
)
const Register = compose(
    withRedirectUser
)(RegisterComponent)

export default Register