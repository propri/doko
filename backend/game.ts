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

export const defaultTrumpfOrder = {
  'Herz 10': 5,
  'Kreuz Dame': 6,
  'Pik Dame': 7,
  'Herz Dame': 8,
  'Karo Dame': 9,
  'Kreuz Bube': 10,
  'Pik Bube': 11,
  'Herz Bube': 12,
  'Karo Bube': 13,
  'Karo Ass': 14,
  'Karo 10': 15,
  'Karo Koenig': 16,
  'Karo 9': 17,
}

export const defaultKreuzOrder = {
  'Kreuz Ass': 5,
  'Kreuz 10': 6,
  'Kreuz Koenig': 7,
  'Kreuz 9': 6,
}

export const defaultPikOrder = {
  'Pik Ass': 5,
  'Pik 10': 6,
  'Pik Koenig': 7,
  'Pik 9': 6,
}

export const defaultHerzOrder = {
  'Herz Ass': 5,
  'Herz Koenig': 6,
  'Herz 9': 7,
}

export const displayOrder = {
  // Trumpf
  'Herz 10': 5,
  'Kreuz Dame': 6,
  'Pik Dame': 7,
  'Herz Dame': 8,
  'Karo Dame': 9,
  'Kreuz Bube': 10,
  'Pik Bube': 11,
  'Herz Bube': 12,
  'Karo Bube': 13,
  'Karo Ass': 14,
  'Karo 10': 15,
  'Karo Koenig': 16,
  'Karo 9': 17,
  // Kreuz
  'Kreuz Ass': 25,
  'Kreuz 10': 26,
  'Kreuz Koenig': 27,
  'Kreuz 9': 26,
  // Pik
  'Pik Ass': 35,
  'Pik 10': 36,
  'Pik Koenig': 37,
  'Pik 9': 36,
  // Herz
  'Herz Ass': 45,
  'Herz Koenig': 46,
  'Herz 9': 47,
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

//export const game: Game = {
//const game: Game = {
  //spieler: [],
  //turnCounter: 0,
  //aktuellerStich: {
    //gespielteKarten: [],
  //},
  //alleStiche: [],
//}

function advanceTurn(game: Game) {
  game.turnCounter += 1
}

export function playCard(game: Game, spieler: Spieler, karte: Card) {
  if (game.naechsterSpieler !== spieler) {
    throw Error('Spieler nicht am Zug')
  }
  if (!spieler.cards.includes(karte)) {
    throw Error('Ungültige Karte')
  }
  advanceTurn(game)

  // TODO: Karte aus Hand vom Spieler entfernen

  game.aktuellerStich.gespielteKarten.push({
    spieler,
    card: karte,
  })
  if (game.aktuellerStich.gespielteKarten.length === 4) {
    // TODO: gewinner des Stichs bestimmen -> aufspiel
  } else {
    game.naechsterSpieler = getNaechsterSpieler(game, spieler)
  }
}

// turncounter
export function getTurn(game: Game): number {
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

function getNaechsterSpieler(game: Game, spieler: Spieler): Spieler {
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

export function startGame(spieler: Spieler[]): Game {
  if (spieler.length !== 4) {
    throw Error('needs exactly 4 players')
  }

  const game: Game = {
    spieler: [],
    turnCounter: 0,
    aktuellerStich: {
      gespielteKarten: [],
    },
    alleStiche: [],
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
  game.naechsterSpieler = getNaechsterSpieler(
    game, game.spieler.find((spieler) => spieler.geber) ?? fallback
  )
  game.aktuellerStich = {
    gespielteKarten: [],
  }
  game.alleStiche = []

  return game
}
