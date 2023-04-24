import type { Card } from '../common/cards'

// get name of card
export default function serializeCard(card: Card): string {
  return `${card.farbe} ${card.wert}`
}
