import { positions } from './types'
import { Game, Spieler } from './game'

export default function getNaechsterSpieler(
  game: Game,
  spieler: Spieler
): Spieler {
  const curIdx = positions.findIndex(
    (position) => spieler.position === position
  )
  const nextPosition = positions[(curIdx + 1) % positions.length]
  const nextSpieler = game.spieler.find(
    ({ position }) => position === nextPosition
  )
  if (!nextSpieler) {
    // sollte nie vorkommen
    throw Error('naechsten Spieler nicht gefunden')
  }
  return nextSpieler
}
