import { withUser } from 'ooth-client-react';
import { compose, withState, Omit } from 'recompose';
import * as React from 'react';
import withHead from '../hocs/head';
import withLink from '../hocs/link';
import withI18n, { __ } from '../hocs/i18n';
import { User } from 'ooth-client';

type MenuItem = {
  url: string;
  name: string;
  label: string;
};

type Props = {
  __: __;
  title: string;
  children: any;
  page: string;
  user: ExtendedUser;
  toggled: boolean;
  setToggled: (toggled: boolean) => void;
  siteName: string;
  menu: MenuItem[];
  userMenu: MenuItem[];
  footerMessage: string;
  Head: any;
  Link: any;
  fluid?: boolean;
};

type ExtendedUser = User & {
  local: {
    username: string;
    email: string;
  };
  facebook: {
    email: string;
  };
  google: {
    email: string;
  };
};

const getUsername = (user: ExtendedUser) =>
  user.local
    ? user.local.username || user.local.email
    : user.facebook
      ? user.facebook.email
      : user.google && user.google.email;

const StatelessLayout = ({
  __,
  title,
  children,
  page,
  user,
  toggled,
  setToggled,
  siteName,
  menu,
  userMenu,
  footerMessage,
  Head,
  Link,
  fluid,
}: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div
      style={{
        paddingTop: '50px',
        paddingBottom: '20px',
      }}
    >
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className={fluid ? 'container-fluid' : 'container'}>
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
              onClick={() => {
                setToggled(!toggled);
              }}
            >
              <span className="sr-only">{__('layout.toggle-navigation')}</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand" href="/">
              {siteName}
            </a>
          </div>
          <div id="navbar" className={'collapse navbar-collapse' + (toggled ? ' in' : '')}>
            <ul className="nav navbar-nav navbar-right">
              {menu.map(({ url, name, label }) => (
                <li key={name} className={page === name ? 'active' : undefined}>
                  <Link href={url}>
                    <a>{label}</a>
                  </Link>
                </li>
              ))}
              {!user && (
                <li className={page === 'login' ? 'active' : undefined}>
                  <Link href="/login">
                    <a>Log in</a>
                  </Link>
                </li>
              )}
              {!user && (
                <li className={page === 'register' ? 'active' : undefined}>
                  <Link href="/register">
                    <a>Register</a>
                  </Link>
                </li>
              )}
              {user && (
                <Dropdown page={page} userMenu={userMenu}>
                  Hello, {getUsername(user)}
                </Dropdown>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
    {children}
    <footer>
      <div className="container">
        <hr />
        {footerMessage}
      </div>
    </footer>
  </div>
);
export default compose<Props, Omit<Props, 'Link' | 'Head' | 'user' | '__'>>(
  withHead,
  withLink,
  withUser,
  withI18n,
  withState('toggled', 'setToggled', false),
)(StatelessLayout);

type DropdownProps = {
  page: string;
  children: any;
  toggled: boolean;
  setToggled: (toggled: boolean) => void;
  userMenu: MenuItem[];
  Link: any;
};

const StatelessDropdown = ({ page, children, toggled, setToggled, userMenu, Link }: DropdownProps) => (
  <li className={'dropdown' + (toggled ? ' open' : undefined)}>
    <a
      href="#"
      className="dropdown-toggle"
      data-toggle="dropdown"
      role="button"
      aria-haspopup="true"
      aria-expanded="true"
      onClick={() => {
        setToggled(!toggled);
      }}
    >
      {children} <span className="caret" />
    </a>
    {toggled && (
      <ul className="dropdown-menu">
        {userMenu.map(({ url, name, label }) => (
          <li key={name} className={page === 'name' ? 'active' : undefined}>
            <Link href={url}>
              <a>{label}</a>
            </Link>
          </li>
        ))}
      </ul>
    )}
  </li>
);
const Dropdown = compose<DropdownProps, Omit<DropdownProps, 'Link' | 'toggled' | 'setToggled'>>(
  withLink,
  withState('toggled', 'setToggled', false),
)(StatelessDropdown);
