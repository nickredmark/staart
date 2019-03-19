import Layout from 'staart/lib/components/layout';
import * as React from 'react';

const menu = [
  {
    url: '/',
    name: 'home',
    label: 'Home',
  },
  {
    url: '/about',
    name: 'about',
    label: 'About',
  },
  {
    url: '/blog',
    name: 'blog',
    label: 'Sample Blog',
  },
];

const userMenu = [
  {
    url: '/dashboard',
    name: 'dashboard',
    label: 'Dashboard',
  },
  {
    url: '/account',
    name: 'account',
    label: 'Account',
  },
  {
    url: '/logout',
    name: 'logout',
    label: 'Log out',
  },
];

const siteName = 'Staart';

export default (props) => (
  <Layout
    menu={menu}
    userMenu={userMenu}
    siteName={siteName}
    footerMessage={
      <p>
        Brought to you with ❤ by <a href="/about">Nick Redmark</a>. Find the code on{' '}
        <a href="https://github.com/nmaro/staart">Github</a>.
      </p>
    }
    {...props}
  />
);
