import { isCard } from '../common/cards'
import isPlayedCardValid from './isPlayedCardValid'
import advanceTurn from './advanceTurn'
import getStichGewinner from './getStichGewinner'
import getNaechsterSpieler from './getNaechsterSpieler'

import type { Game, Spieler } from './game'
import type { Card } from '../common/cards'

export default function playCard(
  game: Game,
  spieler: Spieler,
  karte: Card,
  numCards: number
): void {
  // warten, bis letzter Stich abgeräumt ist
  if (game.aktuellerStich.gespielteKarten.length === 4) {
    throw Error('aktueller Stich noch nicht abgeschlossen')
  }
  // TODO: spieler nach value bestimmen
  if (game.naechsterSpieler !== spieler) {
    throw Error('Spieler nicht am Zug')
  }
  if (game.isFinished) {
    throw Error('Alle Karten wurden gespielt')
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
    setTimeout(() => {
      // bestimmen, wer den Stich gewonnen hat
      const gewinner: Spieler = getStichGewinner(game)

      game.aktuellerStich.gewinner = gewinner
      // festlegen, dass gewinner den nächsten stich anspielt
      game.naechsterSpieler = gewinner
      // Stich in Liste der Stiche einfügen
      game.alleStiche.push(game.aktuellerStich)
      // neuen stich vorbereiten
      game.aktuellerStich = {
        gespielteKarten: [],
      }

      // alle stiche gemacht?
      if (game.alleStiche.length === numCards) {
        game.isFinished = true
      }
    }, 2000)
  } else {
    // nächster Spieler in Reihenfolge ist dran.
    game.naechsterSpieler = getNaechsterSpieler(game, spieler)
  }
}
