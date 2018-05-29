const functions = require("firebase-functions")
const cors = require("cors")
const express = require("express")

const objectValues = require('object.values')

const bodyParser = require('body-parser')
const emailAddresses = require('email-addresses')
const multer = require('multer')

const DOMAIN = 'beeseeking.com'
const mailgun = require('mailgun-js')({
  apiKey: functions.config().mailgun.api_key,
  domain: DOMAIN
})

const firebase = require('firebase')
const admin = require('firebase-admin')

const serviceAccount = require('./beeseeking-e0c70-firebase-adminsdk-js5sw-7a51b9e394.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://beeseeking-e0c70.firebaseio.com'
});

const config = {
  apiKey: functions.config().firebase_db.api_key,
  authDomain: "beeseeking-e0c70.firebaseapp.com",
  databaseURL: "https://beeseeking-e0c70.firebaseio.com",
  projectId: "beeseeking-e0c70",
  storageBucket: "beeseeking-e0c70.appspot.com",
  messagingSenderId: "1057093705058"
}

const app = firebase.initializeApp(config)
const db = app.database()

/* Express */
const emailRecipient = express()

emailRecipient.use(cors({ origin: true }))
emailRecipient.use(bodyParser.urlencoded({ extended: true }))

emailRecipient.post("*", (req, response) => {
  if (!req.body.recipient) response.status(404).send("Not found")

  const keyToMatch = req.body.recipient.split('@')[0].split('+')[1]
  if (!keyToMatch) response.status(404).send("Not found")

  const emailText = `${req.body['stripped-text']}\n\n${req.body['stripped-signature']}`
  const emailKeys = firebase.database().ref('/emailKeys/').orderByKey()
  const matchingUser = emailKeys.equalTo(keyToMatch)

  matchingUser.once('value', snapshot => {
    if (!snapshot) response.status(404).send("Not found")

    const uid = objectValues(snapshot.toJSON())[0]

    admin.auth().getUser(uid).then(userRecord => {
      const data = {
        from: req.body.sender,
        to: userRecord.toJSON().email,
        subject: `[Beeseeking] ${req.body.subject}`,
        text: emailText
      }

      mailgun.messages().send(data, (error, body) => {
        if (error) {
          response.send("Error emailing user: " + error)
        } else {
          response.send(body)
        }
      })

      return this
    }).catch(error => {
      response.send("Error fetching user data: " + error)
    })
  })
})

const inboundEmail = functions.https.onRequest(emailRecipient)

module.exports = {
  inboundEmail
}