import type { Card } from '../common/cards'

import { Position } from './types'

export { default as playCard } from './playCard'
export { default as startGame } from './startGame'
export { default as determinePlayerPoints } from './determinePlayerPoints'
export { default as getTurn } from './getTurn'

//import * as variants from './variants'

const MitNeunen = true
export const numCards = MitNeunen ? 12 : 10

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
  isFinished: boolean
}
