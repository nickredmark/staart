const express = require('express')
const Ooth = require('ooth')
const oothLocal = require('ooth-local')
const oothFacebook = require('ooth-facebook')
const oothGoogle = require('ooth-google')
const mail = require('./mail')
const {MongoClient, ObjectId} = require('mongodb')
const OothMongo = require('ooth-mongo')

module.exports = async function start(app, settings) {

    const ooth = new Ooth({
        sharedSecret: settings.sharedSecret,
        path: settings.oothPath,
    })
    const db = await MongoClient.connect(settings.mongoUrl)
    const oothMongo = new OothMongo(db, ObjectId)

    await ooth.start(app, oothMongo)

    const sendMail = mail(settings.mailgun)
    ooth.use('local', oothLocal({
        onRegister({email, verificationToken, _id}) {
            sendMail({
                from: settings.mail.from,
                to: email,
                subject: 'Welcome',
                body: `Thank you for joining!`,
                html: `Thank you for joining!`,
            })
            sendMail({
                from: settings.mail.from,
                to: email,
                subject: 'Verify your email address',
                body: `Please verify your email by opening the following url: /verify-email?token=${verificationToken}&userId=${_id}.`,
                html: `Please verify your email by opening the following url: /verify-email?token=${verificationToken}&userId=${_id}.`,
            })
        },
        onGenerateVerificationToken({email, verificationToken, _id}) {
            sendMail({
                from: settings.mail.from,
                to: email,
                subject: 'Verify your email address',
                body: `Please verify your email by opening the following url: /verify-email?token=${verificationToken}&userId=${_id}.`,
                html: `Please verify your email by opening the following url: /verify-email?token=${verificationToken}&userId=${_id}.`,
            })
        },
        onSetEmail({email, verificationToken, _id}) {
            sendMail({
                from: settings.mail.from,
                to: email,
                subject: 'Verify your email address',
                body: `Please verify your email by opening the following url: /verify-email?token=${verificationToken}&userId=${_id}.`,
                html: `Please verify your email by opening the following url: /verify-email?token=${verificationToken}&userId=${_id}.`,
            })
        },
        onVerify({email}) {
            sendMail({
                from: settings.mail.from,
                to: email,
                subject: 'Address verified',
                body: `Your email address has been verified.`,
                html: `Your email address has been verified.`,
            })
        },
        onForgotPassword({email, passwordResetToken, _id}) {
            sendMail({
                from: settings.mail.from,
                to: email,
                subject: 'Reset password',
                body: `Reset your password on the following page: /reset-password?token=${passwordResetToken}&userId=${_id}.`,
                html: `Reset your password on the following page: /reset-password?token=${passwordResetToken}&userId=${_id}.`,
            })
        },
        onResetPassword({email}) {
            sendMail({
                from: settings.mail.from,
                to: email,
                subject: 'Password has been reset',
                body: 'Your password has been reset.',
                html: 'Your password has been reset.'
            })
        },
        onChangePassword({email}) {
            sendMail({
                from: settings.mail.from,
                to: email,
                subject: 'Password has been changed',
                body: 'Your password has been changed.',
                html: 'Your password has been changed.'
            })
        }
    }))

    ooth.use('facebook', oothFacebook(settings.facebook))

    ooth.use('google', oothGoogle(settings.google))

}