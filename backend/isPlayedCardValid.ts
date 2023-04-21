import { Card } from '../common/cards'
import { Game } from './game'

export default function isPlayedCardValid(
  game: Game,
  karte: Card,
  hand: Card[]
): boolean {
  // Alle Karten dürfen angespielt werden
  if (game.aktuellerStich.gespielteKarten.length === 0) {
    return true
  }

  const angespielt: Card = game.aktuellerStich.gespielteKarten[0].card
  // Trumpf ist angespielt, Trumpf wird bedient
  if (angespielt.trumpf && karte.trumpf) {
    return true
  }
  // Trumpf ist angespielt, Spieler hat kein Trumpf
  if (angespielt.trumpf && !hand.find((c) => c.trumpf)) {
    return true
  }
  // Fehlfarbe ist angespielt, wird bedient
  if (angespielt.farbe === karte.farbe) {
    return true
  }
  // Fehlfarbe ist angespielt, Spieler hat Fehlfarbe nicht mehr
  if (!hand.find((c) => c.farbe === angespielt.farbe)) {
    return true
  }
  return false
}
