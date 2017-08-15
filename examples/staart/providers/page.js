import provideOothNext from './ooth'
import provideNext from './next'
import provideSettings from './settings'
import {compose} from 'recompose'

export default compose(
    provideOothNext,
    provideNext,
    provideSettings
)