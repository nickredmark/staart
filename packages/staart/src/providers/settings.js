import PropTypes from 'prop-types'
import {withContext} from 'recompose'

export default (settings) => withContext({
    settings: PropTypes.object,
}, () => ({
    settings
}))
