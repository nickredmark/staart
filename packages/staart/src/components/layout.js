import {withUser} from 'ooth-client-react'
import {compose, withState} from 'recompose'
import React from 'react'
import withHead from '../hocs/head'
import withLink from '../hocs/link'

const StatelessLayout = ({title, children, page, user, toggled, setToggled, siteName, menu, userMenu, footerMessage, Head, Link}) => (
    <div>
        <Head>
            <title>Get Staarted!</title>
            <link rel='stylesheet' href='//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' />
        </Head>
        <div style={{
            paddingTop: '50px',
            paddingBottom: '20px'
        }}>
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"
                        onClick={() => {
                            setToggled(!toggled)
                        }}>
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/">{siteName}</a>
                    </div>
                    <div id="navbar" className={"collapse navbar-collapse" + (toggled ? ' in' : '')}>
                        <ul className="nav navbar-nav navbar-right">
                            {menu.map(({url, name, label}) => (
                                <li key={name} className={page === name && 'active'}>
                                    <Link href={url}>
                                        <a>{label}</a>
                                    </Link>
                                </li>
                            ))}
                            {!user &&
                                <li className={page === 'login' && 'active'}>
                                    <Link href="/login">
                                        <a>Log in</a>
                                    </Link>
                                </li>
                            }
                            {!user &&
                                <li className={page === 'register' && 'active'}>
                                    <Link href="/register">
                                        <a>Register</a>
                                    </Link>
                                </li>
                            }
                            {user &&
                                <Dropdown page={page} userMenu={userMenu}>
                                    Hello, {user.local.username || user.local.email}
                                </Dropdown>
                            }
                        </ul>
                    </div>        
                </div>
            </nav>
        </div>        
        {children}
        <footer>
            <div className="container">
                <hr/>
                {footerMessage}
            </div>
        </footer>
    </div>
)
export default compose(
    withHead,
    withLink,
    withUser,
    withState('toggled', 'setToggled', false)
)(StatelessLayout)

const StatelessDropdown = ({page, children, toggled, setToggled, userMenu, Link}) => (
    <li className={'dropdown' + (toggled && ' open')}>
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true" onClick={() => {
            setToggled(!toggled)
        }}>{children} <span className="caret"></span></a>
        {toggled &&
            <ul className="dropdown-menu">
                {userMenu.map(({url, name, label}) => (
                    <li key={name} className={page === 'name' && 'active'}>
                        <Link href={url}>
                            <a>{label}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        }
    </li>    
)
const Dropdown = compose(
    withLink,
    withState('toggled', 'setToggled', false)
)(StatelessDropdown)
