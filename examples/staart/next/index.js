const next = require('next')
const express = require('express')
const settings = require('./settings')
const api = require('./server/api').start

const dev = process.env.NODE_ENV !== 'prod'

const start = async () => {
    try {
        const app = express()

        await api(app, settings)
        
        const nextApp = next({
            dev
        })
        const handle = nextApp.getRequestHandler()

        await nextApp.prepare()

        app.get('*', (req, res) => {
            return handle(req, res)
        })

        await app.listen(settings.port)

        console.log(`Online at ${settings.url}:${settings.port}`)
    } catch (e) {
        console.error(e)
    }
}

start()
