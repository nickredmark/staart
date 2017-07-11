module.exports = {
    url: 'http://localhost',
    port: 3002,
    wsPort: 3005,
    originUrl: 'http://localhost:3000',
    mongoUrl: 'mongodb://localhost:27017/staart',
    sharedSecret: 'sharedsecret',
    sessionSecret: 'sessionsecret',
    oothPath: '/auth',
    mailgun: {
        apiKey: "key-f5dc4e2df3d924f68b228a2dffded4ee",
        domain: "sandbox188b66fba69c4f2d9933c346302c7efb.mailgun.org"
    },
    mail: {
        from: "noreply@example.com"
    }
}