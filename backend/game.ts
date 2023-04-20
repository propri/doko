import Karten, { shuffle, isCard, serializeCard } from '../common/cards'
import type { Card, KartenWert, KartenFarbe } from '../common/cards'
//import * as variants from './variants'

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

export const defaultTrumpfOrder: Record<string, number> = {
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

export const defaultFehlOrder: Record<string, number> = {
  Ass: 5,
  '10': 6,
  Koenig: 7,
  '9': 6,
}

//export const defaultKreuzOrder: Record<string, number> = {
//'Kreuz Ass': 5,
//'Kreuz 10': 6,
//'Kreuz Koenig': 7,
//'Kreuz 9': 6,
//}

//export const defaultPikOrder: Record<string, number> = {
//'Pik Ass': 5,
//'Pik 10': 6,
//'Pik Koenig': 7,
//'Pik 9': 6,
//}

//export const defaultHerzOrder: Record<string, number> = {
//'Herz Ass': 5,
//'Herz Koenig': 6,
//'Herz 9': 7,
//}

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

// turncounter
export function getTurn(game: Game): number {
  return game.turnCounter
}

function advanceTurn(game: Game) {
  game.turnCounter += 1
}

function isPlayedCardValid(game: Game, karte: Card, hand: Card[]): boolean {
  // Alle Karten dürfen angespielt werden
  if (game.aktuellerStich.gespielteKarten.length === 0) {
    return true
  }

  const angespielt: Card = game.aktuellerStich.gespielteKarten[0].card
  // Trumpf ist angespielt, Trumpf wird bedient
  if (angespielt.trumpf && karte.trumpf) {
    return true
  }
  // Trumpf ist angespielt, Spieler hat kein Trumpf
  if (angespielt.trumpf && !hand.find((c) => c.trumpf)) {
    return true
  }
  // Fehlfarbe ist angespielt, wird bedient
  if (angespielt.farbe === karte.farbe) {
    return true
  }
  // Fehlfarbe ist angespielt, Spieler hat Fehlfarbe nicht mehr
  if (!hand.find((c) => c.farbe === angespielt.farbe)) {
    return true
  }
  return false
}

function getGewinner(game: Game): Spieler {
  const hasTrumpf: boolean = !!game.aktuellerStich.gespielteKarten.find(
    ({ card }) => card.trumpf
  )
  const stich = game.aktuellerStich
  //let gewinner: Spieler
  if (hasTrumpf) {
    /* TODO: Sonderregeln */
    const Herz10en = stich.gespielteKarten.filter(
      ({ card }) => card.wert === '10' && card.farbe === 'Herz'
    )
    // mehr als eine Herz 10 im Stich
    if (Herz10en.length === 2) {
      const isLetzterStich: boolean = game.alleStiche.length === numCards - 1
      if (isLetzterStich) {
        return Herz10en[0].spieler
      }
      return Herz10en[1].spieler
    }
    /* maximal eine Herz 10, höchster Trumpf gewinnt */
    const gewinnerKarte = stich.gespielteKarten.reduce(
      (previousValue, currentValue) => {
        if (!currentValue.card.trumpf) {
          return previousValue
        }
        if (
          defaultTrumpfOrder[serializeCard(currentValue.card)] ??
          99 < defaultTrumpfOrder[serializeCard(previousValue.card) ?? 99]
        ) {
          return currentValue
        }
        return previousValue
      },
      stich.gespielteKarten[0]
    )
    return gewinnerKarte.spieler
  } else {
    const angespielt: Card = game.aktuellerStich.gespielteKarten[0].card
    const gewinnerKarte = stich.gespielteKarten.reduce(
      (previousValue, currentValue) => {
        if (currentValue.card.farbe !== angespielt.farbe) {
          return previousValue
        }
        if (
          defaultFehlOrder[currentValue.card.wert] <
          defaultFehlOrder[previousValue.card.wert]
        ) {
          return currentValue
        }
        return previousValue
      },
      stich.gespielteKarten[0]
    )

    return gewinnerKarte.spieler
  }
}

export function playCard(game: Game, spieler: Spieler, karte: Card) {
  // TODO: spieler nach value bestimmen
  if (game.naechsterSpieler !== spieler) {
    throw Error('Spieler nicht am Zug')
  }
  if (!spieler.cards.find((c) => isCard(c, karte))) {
    throw Error('Ungültige Karte')
  }
  /* Karte instanz bestimmen */
  // (wir wissen hier, dass die Karte existiert)
  const gespielteKarte: Card = spieler.cards.find((c) =>
    isCard(c, karte)
  ) as unknown as Card

  // (aufgespielte Karte bedienen, wenn möglich)
  if (!isPlayedCardValid(game, gespielteKarte, spieler.cards)) {
    throw Error('Falsch bedient')
  }
  advanceTurn(game)

  // gespielte Karte aus Hand des Spielers entfernen
  game.spieler.forEach((_spieler, idx) => {
    // TODO: spieler nach value bestimmen
    if (spieler === _spieler) {
      game.spieler[idx].cards = game.spieler[idx].cards.filter(
        (_card) => _card !== gespielteKarte
      )
    }
  })

  game.aktuellerStich.gespielteKarten.push({
    spieler,
    card: gespielteKarte,
  })
  if (game.aktuellerStich.gespielteKarten.length === 4) {
    // TODO: gewinner des Stichs bestimmen -> aufspiel für nächste Runde
    // Stich als gewonnen markieren
    // Stich in Liste gelaufener Stiche einfügen
    const gewinner: Spieler = getGewinner(game)

    game.aktuellerStich.gewinner = gewinner
    game.naechsterSpieler = gewinner
    game.alleStiche.push(game.aktuellerStich)
    game.aktuellerStich = {
      gespielteKarten: [],
    }
  } else {
    game.naechsterSpieler = getNaechsterSpieler(game, spieler)
  }
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
  /* wir sollten immer den nächsten finden können. */
  if ((spieler.position = Position.A)) {
    return game.spieler.find(
      ({ position }) => position === Position.B
    ) as Spieler
  }
  if ((spieler.position = Position.B)) {
    return game.spieler.find(
      ({ position }) => position === Position.C
    ) as Spieler
  }
  if ((spieler.position = Position.C)) {
    return game.spieler.find(
      ({ position }) => position === Position.D
    ) as Spieler
  }
  if ((spieler.position = Position.D)) {
    return game.spieler.find(
      ({ position }) => position === Position.A
    ) as Spieler
  }

  throw Error('spieler nicht vorhanden')
}

// TODO
//export function determinePlayerPoints(game: Game): { spieler: Spieler, punkte: number }[] {
//}

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
    game,
    game.spieler.find((spieler) => spieler.geber) ?? fallback
  )
  game.aktuellerStich = {
    gespielteKarten: [],
  }
  game.alleStiche = []

  return game
}
