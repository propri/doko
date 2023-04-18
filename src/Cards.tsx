import { Card } from '../common/cards'

export const CardFront = ({ card }: { card: Card }) => (
  <img width="150" src={card.face} alt={`${card.farbe} ${card.wert}`} />
)

export const CardBack = ({ card }: { card: Card }) => (
  <img width="150" src={card.back} alt="Karte" />
)
