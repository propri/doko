/* TODO: enum benutzen? */
export type KartenFarbe = 'Kreuz' | 'Pik' | 'Herz' | 'Karo'
/* TODO: typescript: kann man das nicht irgendwie automatisch bestimmen? */
const kartenFarben: KartenFarbe[] = ['Kreuz', 'Pik', 'Herz', 'Karo']

/* TODO: enum benutzen? */
export type KartenWert = 'Ass' | '10' | 'Koenig' | 'Dame' | 'Bube' | '9'
/* TODO: typescript: kann man das nicht irgendwie automatisch bestimmen? */
const kartenWerte: KartenWert[] = ['Ass', '10', 'Koenig', 'Dame', 'Bube', '9']

export const KartenPunkte: Record<KartenWert, number> = {
  Ass: 11,
  10: 10,
  Koenig: 4,
  Dame: 3,
  Bube: 2,
  9: 0,
}

export interface Card {
  farbe: KartenFarbe
  wert: KartenWert
  face: string
  back: string
  trumpf?: boolean
}

const back1 = 'cards/card_back_blue.png'
const back2 = 'cards/card_back_orange.png'

const Cards: Card[] = []

// generate cards (one each for each suit, value and deck)
kartenFarben.forEach((suit) => {
  kartenWerte.forEach((value) => {
    ;[back1, back2].forEach((back: string) => {
      Cards.push({
        farbe: suit,
        wert: value,
        back,
        face: `cards/${value}_${suit}.png`,
      })
    })
  })
})

export function shuffle(cards: Card[]) {
  let m = cards.length
  let t: Card
  let i: number

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--)

    // And swap it with the current element.
    t = cards[m]
    cards[m] = cards[i]
    cards[i] = t
  }

  return cards
}

// get name of card
export function serializeCard(card: Card): string {
  return `${card.farbe} ${card.wert}`
}

// check if card instance is same as card name
export function isCard(card: Card, cardNameOrInstance: string | Card): boolean {
  if (typeof cardNameOrInstance === 'string') {
    return serializeCard(card) === cardNameOrInstance
  }
  return card.farbe === cardNameOrInstance.farbe && card.wert === cardNameOrInstance.wert
}

export default Cards
