import type { Spieler } from './game'

export function getNextGeber(spieler: Spieler[]): Spieler {
  /* wenn noch kein geber vorhanden, wird erster Spieler naechster geber -> letzter Spieler ist voriger Geber */
  const currentGeber = spieler.findIndex((s) => s.geber)

  return spieler[(currentGeber + 5) % 4]
}

export function isNextGeber(spieler: Spieler[], username: string) {
  const nextGeber = getNextGeber(spieler)

  return nextGeber.name === username
}

export default function setupNextGeber(spieler: Spieler[]) {
  const nextGeber = getNextGeber(spieler)

  spieler.forEach((s, idx) => {
    spieler[idx].geber = s.name === nextGeber.name
  })
}
