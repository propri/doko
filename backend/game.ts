import Karten, { Card, shuffle, KartenWert, KartenFarbe } from '../common/cards'

const MitNeunen = true
const numCards = MitNeunen ? 12 : 10

export enum Position {
  'A',
  'B',
  'C',
  'D',
}

export enum SpielTyp {
  default,
}

export interface Trumpf {
  karten: Pick<Card, 'wert' | 'farbe'>[]
  farben: KartenFarbe[]
  werte: KartenWert[]
}

const defaultTrumpf: Trumpf = {
  karten: [
    {
      wert: '10',
      farbe: 'Herz',
    },
  ],
  farben: ['Karo'],
  werte: ['Dame', 'Bube'],
}

const DamenSoloTrump: Trumpf = {
  karten: [],
  farben: [],
  werte: ['Dame'],
}

export const positions: Position[] = [
  Position.A,
  Position.B,
  Position.C,
  Position.D,
]

export interface Spieler {
  name: string
  position: Position
  cards: Card[]
  geber: boolean
}

export interface Stich {
  anspiel?: Card
  gespielteKarten: {
    spieler: Spieler
    card: Card
  }[]
  gewinner?: Spieler
}

export interface Game {
  spieler: Spieler[]
  naechsterSpieler?: Spieler
  turnCounter: number
  aktuellerStich: Stich
  alleStiche: Stich[]
}

export const game: Game = {
  spieler: [],
  turnCounter: 0,
  aktuellerStich: {
    gespielteKarten: [],
  },
  alleStiche: [],
}

function advanceTurn() {
  game.turnCounter += 1
}

export function playCard(spieler: Spieler, karte: Card) {
  if (game.naechsterSpieler !== spieler) {
    throw Error('Spieler nicht am Zug')
  }
  if (!spieler.cards.includes(karte)) {
    throw Error('Ungültige Karte')
  }
  advanceTurn()

  game.aktuellerStich.gespielteKarten.push({
    spieler,
    card: karte,
  })
  if (game.aktuellerStich.gespielteKarten.length === 4) {
    // TODO: gewinner des Stichs bestimmen
  } else {
    game.naechsterSpieler = getNaechsterSpieler(spieler)
  }
}

export function getTurn(): number {
  return game.turnCounter
}

function setTrumpf(cards: Card[], variante: SpielTyp) {
  const trumpf = variante === SpielTyp.default ? defaultTrumpf : DamenSoloTrump
  cards.forEach((card) => {
    card.trumpf = false
    if (
      trumpf.werte.includes(card.wert) ||
      trumpf.farben.includes(card.farbe)
    ) {
      card.trumpf = true
    }
    if (
      trumpf.karten.some(
        (trumpfKarte) =>
          trumpfKarte.wert === card.wert && trumpfKarte.farbe === card.farbe
      )
    ) {
      card.trumpf = true
    }
  })
}

function getNaechsterSpieler(spieler: Spieler): Spieler {
  const fallback = game.spieler[0]
  if ((spieler.position = Position.A)) {
    return (
      game.spieler.find(({ position }) => position === Position.B) ?? fallback
    )
  }
  if ((spieler.position = Position.B)) {
    return (
      game.spieler.find(({ position }) => position === Position.C) ?? fallback
    )
  }
  if ((spieler.position = Position.C)) {
    return (
      game.spieler.find(({ position }) => position === Position.D) ?? fallback
    )
  }
  if ((spieler.position = Position.D)) {
    return (
      game.spieler.find(({ position }) => position === Position.A) ?? fallback
    )
  }

  return fallback
}

export function startGame(game: Game, spieler: Spieler[]) {
  if (spieler.length !== 4) {
    throw Error('needs exactly 4 players')
  }
  const cards = shuffle([...Karten])
  setTrumpf(cards, SpielTyp.default)
  game.spieler = spieler.map((s, idx) => ({
    ...s,
    geber: idx === 0,
    cards: cards.slice(idx * numCards, (idx + 1) * numCards),
  }))

  const fallback = game.spieler[0]
  game.turnCounter = 0
  game.aktuellerStich = {
    naechsterSpieler: getNaechsterSpieler(
      game.spieler.find((spieler) => spieler.geber) ?? fallback
    ),
    gespielteKarten: [],
  }
  game.alleStiche = []
}
