module.exports = {
    url: 'http://localhost',
    port: 3000,
    originUrl: 'http://localhost:3000',
    mongoUrl: 'mongodb://localhost:27017/staart',
    sharedSecret: 'XXX',
    sessionSecret: 'XXX',
    oothPath: '/auth',
    mailgun: {
        apiKey: "XXX",
        domain: "XXX"
    },
    mail: {
        from: "info@example.com"
    }    
}
