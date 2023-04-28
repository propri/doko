import React from 'react'
import { CardFront } from './Cards'
import { useUserInfo, useNextCard, useMyCards } from './api'

export default function ActivePlayer() {
  const cardNumbers = 12
  const offsetBase = cardNumbers / 3

  const { data: cards } = useMyCards()
  const { data: nextCard } = useNextCard()
  const { data: userInfo } = useUserInfo()

  return (
    <div
      className={`player ActivePlayer ${
        userInfo?.position === nextCard?.spieler.position ? 'next' : ''
      }`}
    >
      {cards?.map((card, idx) => (
        <div
          className="card"
          style={{ left: `-${offsetBase * idx}%` }}
          key={`${card.farbe}-${card.wert}-${card.back}`}
        >
          <CardFront card={card} />
        </div>
      ))}
    </div>
  )
}
