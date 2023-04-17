import express from 'express'
//const sessions = require('sessions')

//const SECRET = process.env.SECRET || 'supersecret-secret'
const PORT = process.env.PORT || 3001

/* one day */
//const maxAge = 24 * 60 * 60 * 1000

const app = express()

//app.use(sessions({
//secret: SECRET,
//saveUninitialized: true,
//cookie: {
//maxAge,
//},
//resave: false,
//})

app.get('/api', (req, res) => {
  res.json({ message: 'Foobar' })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} (via typescript. Yay!)`)
})
