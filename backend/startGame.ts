import Karten, { shuffle } from '../common/cards'
import { SpielTyp } from './types'
import setTrumpf from './setTrumpf'
import getNaechsterSpieler from './getNaechsterSpieler'
import { Spieler, Game } from './game'
import setupNextGeber from './nextGeber'

export default function startGame(spieler: Spieler[], numCards: number): Game {
  if (spieler.length !== 4) {
    throw Error('needs exactly 4 players')
  }

  /* TODO: wenn keine 9en, die 9en aus den Karten aussortieren */

  const game: Game = {
    spieler: [],
    turnCounter: 0,
    aktuellerStich: {
      gespielteKarten: [],
    },
    alleStiche: [],
    isFinished: false,
  }
  const cards = shuffle([...Karten])
  setTrumpf(cards, SpielTyp.default)

  setupNextGeber(spieler)

  game.spieler = spieler.map((s, idx) => ({
    ...s,
    cards: cards.slice(idx * numCards, (idx + 1) * numCards),
  }))

  const fallback = game.spieler[0]
  game.turnCounter = 0
  game.naechsterSpieler = getNaechsterSpieler(
    game,
    game.spieler.find((spieler) => spieler.geber) ?? fallback
  )
  game.aktuellerStich = {
    gespielteKarten: [],
  }
  game.alleStiche = []

  return game
}
