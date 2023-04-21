import { Game } from './game'

export default function advanceTurn(game: Game): void {
  game.turnCounter += 1
}
