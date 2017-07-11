import Router from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import {composeInitialProps} from 'compose-next'
import provideNext from 'staart/lib/providers/next'

export default provideNext(Router, Link, Head)