import Layout from './layout'
import React, {Component} from 'react'
import withLoginRequired from '../hocs/login-required'
import withI18n from '../hocs/i18n'
import {compose} from 'recompose'
import Local from './account-local'
import Facebook from './account-facebook'
import Google from './account-google'

const AccountComponent = ({__}) => (
    <div style={{
        maxWidth: '300px',
        margin: 'auto'
    }}>
        <h1>{__('account.account')}</h1>
        <h2>{__('account-local.username.username')}</h2>
        <Local/>
        <Facebook/>
        <Google/>
    </div>
)
const Account = compose(
    withLoginRequired('/account'),
    withI18n,
)(AccountComponent)
export default Account
