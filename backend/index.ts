import express from 'express'
//const sessions = require('sessions')

import { Position } from './types'
import { startGame } from './game'
import type { Spieler } from './game'

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

const game = startGame(spieler)

app.get('/my-cards', (req, res) => {
  const currentPlayer: Spieler = game.spieler.find((s) => {
    return req.query.spieler === s.name
  }) as unknown as Spieler
  //console.log(currentPlayer)
  res.json(currentPlayer.cards)
})

app.get('/api', (req, res) => {
  res.json({ message: 'Foobar' })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} (via typescript. Yay!)`)
})
