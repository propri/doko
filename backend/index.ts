import express from 'express'
import sessions from 'express-session'
import cookieParser from 'cookie-parser'

import { Position, positions } from './types'
import { playCard, startGame } from './game'
import type { Spieler, Game } from './game'
import determinePlayerPoints from './determinePlayerPoints'
import { isNextGeber } from './nextGeber'

const SECRET = process.env.SECRET || 'supersecret-secret'
const PORT = process.env.PORT || 3001

/* one day */
const maxAge = 24 * 60 * 60 * 1000

const app = express()

/* daten, die in der session gespeichert werden */
interface mySessionData extends sessions.Session {
  userid?: string
  position?: Position
}

const numCards = 12

let canStartNextRound = false

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

const spieler: Spieler[] = []

let game: Game

/* route, auf der user sich einloggen können */
app.post('/login', (req, res) => {
  if (req.body.username && typeof req.body.username === 'string') {
    const session: mySessionData = req.session
    if (spieler.find(({ name }) => name === req.body.username)) {
      res.status(400).end('name already exists')
      return
    }
    if (spieler.length >= 4) {
      res.status(400).end('spiel voll')
    }
    session.userid = req.body.username
    const newPlayer: Spieler = {
      name: req.body.username,
      position: positions[spieler.length],
      cards: [],
      geber: false,
    }
    spieler.push(newPlayer)
    if (spieler.length === 4) {
      game = startGame(spieler, 12)
    }
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
    /* game eventuell nicht gesetzt */
    const currentSpieler: Spieler = spieler.find(
      (s) => s.name === session.userid
    ) as Spieler
    res.json({
      message: {
        loggedIn: true,
        user: session.userid,
        position: currentSpieler.position,
      },
    })
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
/*
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
*/

app.get('/letzter-stich', (_, res) => {
  if (game.alleStiche.length === 0) {
    throw new Error('noch kein Stich gespielt')
  }
  const letzterStich = game.alleStiche[game.alleStiche.length - 1]
  res.json({
    ...letzterStich,
    gewinner: letzterStich.gewinner?.name,
    gespielteKarten: letzterStich.gespielteKarten.map(({ spieler, card }) => ({
      card,
      spieler: spieler.name,
    })),
  })
})

app.get('/punkte', (_, res) => {
  try {
    res.json(determinePlayerPoints(game, numCards))
    setTimeout(() => {
      canStartNextRound = true
    }, 5000)
  } catch (e) {
    res.status(204).end()
  }
})

function canStartNextRoundTest(userId: string): boolean {
  if (isNextGeber(spieler, userId)) {
    return canStartNextRound
  }

  return false
}

app.get('/canstartnextround', (req, res) => {
  const session: mySessionData = req.session
  if (!session?.userid) {
    res.status(403).end('needs authentication')
    return
  }

  res.json({ canStartNextRound: canStartNextRoundTest(session.userid) })
})

app.get('/naechste-runde', (req, res) => {
  const session: mySessionData = req.session
  if (!session?.userid) {
    res.status(403).end('needs authentication')
    return
  }
  if (!canStartNextRoundTest(session.userid)) {
    res.status(400).end('cannot start next round')
    return
  }
  canStartNextRound = false
  game = startGame(spieler, numCards)
  setTimeout(() => {
    res.status(204).end()
  }, 500)
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} (via typescript. Yay!)`)
})

// error handler
app.use((err, req, res, next) => {
  //console.error(err.stack)
  res.status(500).send('Something broke!')
})
