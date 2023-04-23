import express from 'express'
import sessions from 'express-session'
import cookieParser from 'cookie-parser'

import { Position } from './types'
import { startGame } from './game'
import type { Spieler } from './game'

const SECRET = process.env.SECRET || 'supersecret-secret'
const PORT = process.env.PORT || 3001

/* one day */
const maxAge = 24 * 60 * 60 * 1000

const app = express()

// passwörter zum einloggen
const passwords: Record<string, string> = {
  'Spieler A': 'foobarA',
  'Spieler B': 'foobarB',
  'Spieler C': 'foobarC',
  'Spieler D': 'foobarD',
}

/* daten, die in der session gespeichert werden */
interface mySessionData extends sessions.Session {
  userid?: string
}

// parse cookies
app.use(cookieParser())

// parse incoming data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* setup sessions */
/* jeder oufruf erzeugt eine neue oder verwendet eine vorhandene session. */
app.use(
  sessions({
    secret: SECRET,
    saveUninitialized: true,
    cookie: {
      maxAge,
    },
    resave: false,
  })
)

const spieler: Spieler[] = [
  {
    name: 'Spieler A',
    position: Position.A,
    cards: [],
    geber: false,
  },
  {
    name: 'Spieler B',
    position: Position.B,
    cards: [],
    geber: false,
  },
  {
    name: 'Spieler C',
    position: Position.C,
    cards: [],
    geber: false,
  },
  {
    name: 'Spieler D',
    position: Position.D,
    cards: [],
    geber: false,
  },
]

/* ein spiel starten */
const game = startGame(spieler, 12)

/* route, auf der user sich einloggen können */
app.post('/login', (req, res) => {
  if (
    req.body.username &&
    typeof req.body.username === 'string' &&
    req.body?.password &&
    typeof req.body.password === 'string' &&
    passwords[req.body.username] === req.body.password
  ) {
    const session: mySessionData = req.session
    session.userid = req.body.username
    console.log(req.session)
    res.json({ message: 'successful' })
  } else {
    res.status(403)
    res.json({ message: 'failed' })
  }
})

app.get('/my-cards', (req, res) => {
  const session: mySessionData = req.session
  if (session.userid) {
    console.log(`Spieler erkannt: ${session.userid}`)
    // was, wenn wir keinen spieler finden?
    const currentPlayer: Spieler = game.spieler.find((s) => {
      return session.userid === s.name
    }) as Spieler
    res.json(currentPlayer.cards)
  }
  res.redirect('/login')
})

/* TODO: route, die user info ausgibt? */

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} (via typescript. Yay!)`)
})
