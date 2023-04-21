import type { Trumpf } from './types'

export const defaultTrumpf: Trumpf = {
  karten: [
    {
      wert: '10',
      farbe: 'Herz',
    },
  ],
  farben: ['Karo'],
  werte: ['Dame', 'Bube'],
}

export const DamenSoloTrump: Trumpf = {
  karten: [],
  farben: [],
  werte: ['Dame'],
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
