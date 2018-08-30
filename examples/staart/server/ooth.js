const { Ooth } = require("ooth");
const oothLocal = require("ooth-local").default;
const oothUser = require("ooth-user").default;
const oothFacebook = require("ooth-facebook").default;
const oothGoogle = require("ooth-google").default;
const mail = require("./mail");
const { MongoClient } = require("mongodb");
const { OothMongo } = require("ooth-mongo");
const emailer = require("ooth-local-emailer").default;

module.exports = async function start(app, settings) {
  const db = await MongoClient.connect(settings.mongoUrl);
  const oothMongo = new OothMongo(db);
  const ooth = new Ooth({
    app,
    backend: oothMongo,
    sessionSecret: settings.sessionSecret,
    path: settings.oothPath
  });
  oothUser({
    ooth
  });
  oothLocal({
    ooth
  });
  if (settings.mailgun) {
    emailer({
      ooth,
      sendMail: mail(settings.mailgun),
      from: "info@example.com",
      siteName: "My Example Site"
    });
  }
  oothFacebook({ ooth, ...settings.facebook });
  oothGoogle({ ooth, ...settings.google });
};
