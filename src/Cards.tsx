import { Card } from '../common/cards'

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

export const CardFront = ({ card }: { card: Card }) => (
  <img width="150" src={card.face} alt={`${card.farbe} ${card.wert}`} />
)

export const CardBack = ({ card }: { card: Card }) => (
  <img width="150" src={card.back} alt="Karte" />
)
