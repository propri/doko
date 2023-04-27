import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card } from '../common/cards'
import { CardFront, sortCards } from './Cards'

export default function ActivePlayer() {
  //const cards: Card[] = []
  const cardNumbers = 12
  const offsetBase = cardNumbers / 3

  const { data: cards } = useQuery({
    queryKey: ['my-cards'],
    queryFn: async (): Promise<Card[]> => {
      console.log('(re)fetch cards')
      const response = await fetch('/my-cards')
      if (!response.ok) {
        throw new Error('Network response not OK')
      }
      const cards = await response.json()
      sortCards(cards)
      return cards
    },
    refetchInterval: 1000, //my-cards
  })

  //const getCards = (ev: any) => {
  //ev.preventDefault()
  //fetch('/my-cards')
  //.then((res) => res.json())
  //.then((crds) => {
  //sortCards(crds)
  //setCards(crds)
  //})
  //}

  return (
    <div className="player ActivePlayer">
      {cards?.map((card, idx) => (
        <div
          className="card"
          style={{ left: `-${offsetBase * idx}%` }}
          key={`${card.farbe}-${card.wert}-${card.back}`}
          //onClick={clickHandler}
        >
          <CardFront card={card} />
        </div>
      ))}
    </div>
  )
}
