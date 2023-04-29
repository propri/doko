import { KartenPunkte } from '../common/cards'
import type { Game, Spieler } from './game'

export default function determinePlayerPoints(
  game: Game,
  numCards: number
): { spieler: Spieler; punkte: number }[] {
  if (game.alleStiche.length !== numCards) {
    throw new Error('noch nicht alle Stiche gespielt')
  }

  const result = game.spieler.map((s) => ({
    spieler: s,
    punkte: 0,
  }))
  game.alleStiche.forEach((stich) => {
    if (!stich.gewinner) {
      throw Error('Alle Stiche müssen einen Gewinner haben')
    }
    const gewinner = stich.gewinner
    const punkte = stich.gespielteKarten.reduce(
      (pv: number, { card }) => pv + KartenPunkte[card.wert],
      0
    )
    result.forEach(({ spieler }, idx) => {
      if (spieler === gewinner) {
        result[idx].punkte += punkte
      }
    })
  })

  return result
}
