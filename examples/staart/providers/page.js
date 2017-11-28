import provideOothNext from './ooth'
import provideNext from './next'
import provideApolloNext from './apollo'
import provideSettings from './settings'
import {compose} from 'recompose'

export default compose(
    provideApolloNext,
    provideOothNext,
    provideNext,
    provideSettings,
)
