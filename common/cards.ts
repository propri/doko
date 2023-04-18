/* TODO: enum benutzen? */
export type KartenFarbe = 'Kreuz' | 'Pik' | 'Herz' | 'Karo'
/* TODO: typescript: kann man das nicht irgendwie automatisch bestimmen? */
const kartenFarben: KartenFarbe[] = ['Kreuz', 'Pik', 'Herz', 'Karo']

/* TODO: enum benutzen? */
export type KartenWert = 'Ass' | '10' | 'Koenig' | 'Dame' | 'Bube' | '9'
/* TODO: typescript: kann man das nicht irgendwie automatisch bestimmen? */
const kartenWerte: KartenWert[] = ['Ass', '10', 'Koenig', 'Dame', 'Bube', '9']

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

export default Cards
