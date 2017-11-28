import Layout from './layout'
import React, {Component} from 'react'
import withLoginRequired from '../hocs/login-required'
import {compose} from 'recompose'
import Local from './account-local'
import Facebook from './account-facebook'
import Google from './account-google'

const AccountComponent = () => (
    <div style={{
        maxWidth: '300px',
        margin: 'auto'
    }}>
        <h1>Account</h1>
        <h2>Username</h2>
        <Local/>
        <Facebook/>
        <Google/>
    </div>
)
const Account = compose(
    withLoginRequired('/account')
)(AccountComponent)
export default Account
