import { serializeCard } from '../common/cards'
import { Card } from '../common/cards'
import { defaultTrumpfOrder, defaultFehlOrder } from './trumpf'
import { Game, Spieler, numCards } from './game'

export default function getStichGewinner(game: Game): Spieler {
  const hasTrumpf: boolean = !!game.aktuellerStich.gespielteKarten.find(
    ({ card }) => card.trumpf
  )
  const stich = game.aktuellerStich
  if (hasTrumpf) {
    /* TODO: Sonderregeln */
    // findLast für zweite Herz10?
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
