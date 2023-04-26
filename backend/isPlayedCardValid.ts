import { Card } from '../common/cards'
import { Game } from './game'

/* Prüfen, ob die gespielte Karte erlaubt ist zu spielen.
 * - Trumpf muss bedient werden, wenn angespielt und Spieler hat Trumpf
 * - Fehl muss bedient werden, wenn angespielt und Spieler hat farbe
 * - Andernfalls beliebige Karte gespielt werden
 */
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
  // darf kein trumpf sein!
  if (angespielt.farbe === karte.farbe && !karte.trumpf) {
    return true
  }
  // Fehlfarbe ist angespielt, Spieler hat Fehlfarbe nicht mehr
  // -> trumpf muss ausgenommen werden beim check ob spieler farbe hat (pik dame zählt nicht als pik fehl)
  if (!hand.find((c) => c.farbe === angespielt.farbe && !c.trumpf)) {
    return true
  }
  return false
}
