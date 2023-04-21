import type { Card, KartenWert, KartenFarbe } from '../common/cards'

export interface Trumpf {
  karten: Pick<Card, 'wert' | 'farbe'>[]
  farben: KartenFarbe[]
  werte: KartenWert[]
}

export enum SpielTyp {
  default,
}

export enum Position {
  'A',
  'B',
  'C',
  'D',
}

export const positions: Position[] = [
  Position.A,
  Position.B,
  Position.C,
  Position.D,
]
