import { SpielTyp } from './types'
import { defaultTrumpf, DamenSoloTrump } from './trumpf'

import type { Card } from '../common/cards'

export default function setTrumpf(cards: Card[], variante: SpielTyp) {
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
