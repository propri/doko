export type CardSuit = 'Kreuz' | 'Pik' | 'Herz' | 'Karo'
const cardSuits: CardSuit[] = ['Kreuz', 'Pik', 'Herz', 'Karo']

export type CardValue = 'Ass' | '10' | 'König' | 'Dame' | 'Bube' | '9'
const cardValues: CardValue[] = ['Ass' , '10' , 'König' , 'Dame' , 'Bube' , '9']

export interface Card {
    suit: CardSuit
    value: CardValue
    face: string
    back: string
}

const back1 = 'cards/card_back_blue.png'
const back2 = 'cards/card_back_orange.png'

const Cards: Card[] = []

cardSuits.forEach((suit) => {
  cardValues.forEach((value) => {
    [back1, back2].forEach((back: string) => {
      Cards.push({
        suit,
        value,
        back,
        face: `cards/${value}_${suit}.png`,
      })
    })
  })
})

export const CardFront = ({ card} : { card: Card} ) => (<img width="150" src={card.face} alt={`${card.suit} ${card.value}`} />) 
export const CardBack = ({ card }: {card : Card} ) => (<img width="150" src={card.back} alt='Karte' />)

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

//export function sortCart(cards: Card[]) {


export default Cards
