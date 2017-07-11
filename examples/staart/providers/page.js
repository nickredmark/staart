import withOothNext from './ooth'
import withNext from './next'
import {compose} from 'recompose'

export default compose(
    withOothNext,
    withNext
)