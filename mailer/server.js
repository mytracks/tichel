'use strict'

const express = require('express')
const nodeMailer = require('nodemailer')
const bodyParser = require('body-parser')
const cors = require('cors')

// Environment Variables
const SMTP_USERNAME = process.env.SMTP_USERNAME
const SMTP_PASSWORD = process.env.SMTP_PASSWORD

// Constants
const PORT = 8082
const HOST = '0.0.0.0'

// App
const app = express()

// Cors
const corsOptions = {
  origin: ['https://tichel.de', 'http://localhost:3000'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const sendMail = (subject, text, recipient, locale, response) => {
  const transporter = nodeMailer.createTransport({
    host: 'mail.mytracks.support',
    port: 587,
    secure: false,
    auth: {
      user: SMTP_USERNAME,
      pass: SMTP_PASSWORD,
    },
  })

  let robotName = ''

  if (locale === 'de') {
    robotName = 'Tichel.de Roboter'
  } else {
    robotName = 'Tichel.de Robot'
  }

  const mailOptions = {
    from: `${robotName} <robot@tichel.de>`,
    to: recipient,
    subject: subject,
    text: text,
  }

  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      response.writeHead(400, {})
    } else {
      console.log('Message %s sent: %s', info.messageId, info.response)
      response.writeHead(200, {})
    }

    response.end()
  })
}

app.post('/mailer/invite', (req, res) => {
  const tichelId = req.body.tichel_id
  const email = req.body.email
  const title = req.body.title
  const locale = req.body.locale ? req.body.locale.toLowerCase() : 'en'

  let text = ''
  let subject = ''

  if (locale === 'de') {
    text = `Hallo.\n\nDu wurdest von zum Tichel '${title}' eingeladen. Klicke auf den folgenden Link, um dir den Tichel anzusehen:\nhttps://tichel.de/tichel/${tichelId}\n\nDein Tichel.de Roboter\n`
    subject = `Du wurdest zum Tichel '${title}' eingeladen`
  } else {
    text = `Hello.\n\nYou have been invited to Tichel '${title}'. Click on the following link to open this Tichel:\nhttps://tichel.de/tichel/${tichelId}\n\nYour Tichel.de Robot\n`
    subject = `You have been invited to Tichel '${title}'`
  }

  sendMail(subject, text, email, locale, res)
})

app.post('/mailer/newtichel', (req, res) => {
  const tichelId = req.body.tichel_id
  const email = req.body.email
  const title = req.body.title
  const creationId = req.body.creation_id
  const locale = req.body.locale ? req.body.locale.toLowerCase() : 'en'

  let text = ''
  let subject = ''

  if (locale === 'de') {
    text = `Hallo.\n\nDu hast den neuen Tichel '${title}' erstellt. Über den folgenden Link kommst du auf deine persönliche Seite, auf der du den Tichel editieren kannst:\nhttps://tichel.de/tichel/${tichelId}?creation_id=${creationId}\n\nWenn du Freunde zu dem Tichel einladen möchtest, dann verwende bitte den folgenden Link:\nhttps://tichel.de/tichel/${tichelId}\n\nDein Tichel.de Roboter\n`
    subject = `Neuer Tichel '${title}'`
  } else {
    text = `Hello.\n\nYou created the new Tichel '${title}'. Click on the following link to open your personal page to view and edit this Tichel:\nhttps://tichel.de/tichel/${tichelId}?creation_id=${creationId}\n\nIf you want to invite friends to this tichel, please use the following link:\nhttps://tichel.de/tichel/${tichelId}\n\nYour Tichel.de Robot\n`
    subject = `New Tichel '${title}'`
  }

  sendMail(subject, text, email, locale, res)
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
