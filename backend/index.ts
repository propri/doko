import express from 'express'
import sessions from 'express-session'
import cookieParser from 'cookie-parser'

import { Position } from './types'
import { playCard, startGame } from './game'
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
  position?: Position
}

const numCards = 12

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
const game = startGame(spieler, numCards)

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
    const currentSpieler = spieler.find(
      (_s) => _s.name === req.body.username
    ) as Spieler
    session.position = currentSpieler.position
    res.json({ message: 'successful' })
  } else {
    res.status(403)
    res.json({ message: 'failed' })
  }
})

app.get('/my-cards', (req, res) => {
  const session: mySessionData = req.session
  if (session.userid) {
    // was, wenn wir keinen spieler finden?
    const currentPlayer: Spieler = game.spieler.find((s) => {
      return session.userid === s.name
    }) as Spieler
    res.json(currentPlayer.cards)
  } else {
    throw new Error('not logged in')
  }
  /*res.redirect('/login')*/
})

app.post('/play-card', (req, res, next) => {
  try {
    const session: mySessionData = req.session
    if (session.userid) {
      const currentPlayer: Spieler = game.spieler.find((s) => {
        return session.userid === s.name
      }) as Spieler
      if (!req.body.card) {
        throw Error('no card')
      }
      playCard(game, currentPlayer, req.body.card, numCards)
      res.json({ message: 'success' })
    } else {
      next()
    }
  } catch (e) {
    next(e)
  }
})

/* info über aktuellen spieler */
app.get('/userinfo', (req, res) => {
  const session: mySessionData = req.session
  if (session.userid) {
    res.json({ message: { loggedIn: true, user: session.userid } })
  } else {
    res.json({ message: { loggedIn: false } })
  }
})

/* info über (alle) spieler */
app.get('/player-info', (_, res) => {
  res.json([
    ...game.spieler.map((s) => ({
      name: s.name,
      position: s.position,
      cardsNumber: s.cards.length,
      geber: s.geber,
    })),
  ])
})

/* info aktueller Stich */
app.get('/stich', (_, res) => {
  res.json([
    ...game.aktuellerStich.gespielteKarten.map(({ spieler, card }) => ({
      card,
      spieler: {
        position: spieler.position,
        name: spieler.name,
      },
    })),
  ])
})

/* welcher Spieler spielt die nächste Karte */
app.get('/naechste-karte', (_, res) => {
  res.json({
    spieler: {
      ...game.naechsterSpieler,
      cards: [],
    },
  })
})

/* alle bis jetzt (vollständig) gespielte stiche. spieler gefiltert */
app.get('/debug/stiche', (_, res) => {
  res.json(
    game.alleStiche.map((s) => ({
      ...s,
      gewinner: s.gewinner?.name ?? '',
      gespielteKarten: s.gespielteKarten.map((gs) => ({
        ...gs,
        spieler: gs.spieler.name,
      })),
    }))
  )
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} (via typescript. Yay!)`)
})

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
