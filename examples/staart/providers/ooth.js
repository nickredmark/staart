import OothClient from 'ooth-client'
import withOothNext from 'ooth-client-react-next'


const oothClient = new OothClient({
    oothUrl: '/auth',
})

export default withOothNext(oothClient)
