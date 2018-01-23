import {compose} from 'recompose'
import withRedirectUser from '../hocs/redirect-user'
import React, {Component} from 'react'
import Local from './login-local'
import Facebook from './login-facebook'
import Google from './login-google'
import withI18n from '../hocs/i18n'

const LoginComponent = ({__}) => (
    <div style={{
        maxWidth: '300px',
        margin: 'auto'
    }}>
        <h1>{__('login-component.login')}</h1>
        <Local/>
        <p style={{
            textAlign: 'center'
        }}>{__('login-component.or')}</p>
        <Facebook/>
        <Google/>
        <p>{__('login-component.new-user')} <a href="/register">{__('login-component.register')}</a>.</p>
    </div>
)
const Login = compose(
    withRedirectUser,
    withI18n,
)(LoginComponent)

export default Login

