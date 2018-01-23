import React, {Component} from 'react'
import withRedirectUser from '../hocs/redirect-user'
import {compose} from 'recompose'
import Local from './register-local'
import Facebook from './login-facebook'
import Google from './login-google'
import withI18n from '../hocs/i18n'

const RegisterComponent = ({__}) => (
    <div style={{
        maxWidth: '300px',
        margin: 'auto'
    }}>
        <h1>{__('register.register')}</h1>
        <Local/>
        <p style={{
            textAlign: 'center'
        }}>{__('register.or')}</p>
        <Facebook label={__('login-facebook.register-with-facebook')}/>
        <Google label={__('login-google.register-with-google')}/>
        <p>{__('register.have-account')} <a href="/login">{__('register.login')}</a>.</p>
    </div>
)
const Register = compose(
    withRedirectUser,
    withI18n,
)(RegisterComponent)

export default Register