import PropTypes from 'prop-types'
import {withContext} from 'recompose'

export default (Router, Link, Head) => withContext({
    Router: PropTypes.object,
    Link: PropTypes.func,
    Head: PropTypes.func,
}, () => ({
    Router,
    Link,
    Head,
}))