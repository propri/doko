import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'

import type { Card } from '../common/cards'
import serializeCard from './serializeCard'
import CardStyleContext from './CardStyleContext'

export const displayOrder: Record<string, number> = {
  // Trumpf
  'Herz 10': 5,
  'Kreuz Dame': 6,
  'Pik Dame': 7,
  'Herz Dame': 8,
  'Karo Dame': 9,
  'Kreuz Bube': 10,
  'Pik Bube': 11,
  'Herz Bube': 12,
  'Karo Bube': 13,
  'Karo Ass': 14,
  'Karo 10': 15,
  'Karo Koenig': 16,
  'Karo 9': 17,
  // Kreuz
  'Kreuz Ass': 25,
  'Kreuz 10': 26,
  'Kreuz Koenig': 27,
  'Kreuz 9': 28,
  // Pik
  'Pik Ass': 35,
  'Pik 10': 36,
  'Pik Koenig': 37,
  'Pik 9': 38,
  // Herz
  'Herz Ass': 45,
  'Herz Koenig': 46,
  'Herz 9': 47,
}

export function sortCards(cards: Card[]): void {
  cards.sort(
    (cardA, cardB) =>
      displayOrder[serializeCard(cardA)] - displayOrder[serializeCard(cardB)]
  )
}

export const CardFront = ({ card }: { card: Card }) => {
  const queryClient = useQueryClient()
  const cardStyle = useContext(CardStyleContext)

  const { mutate: playCard } = useMutation({
    mutationFn: async () => {
      fetch('/play-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          card,
        }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['my-cards'])
      queryClient.invalidateQueries(['stich'])
    },
  })

  if (!cardStyle) {
    return null
  }

  return (
    <img
      width="150"
      src={`${cardStyle.style}/${card.face}`}
      alt={`${card.farbe} ${card.wert}`}
      onClick={() => playCard()}
    />
  )
}

export const CardBack = ({ card }: { card: Card }) => {
  const cardStyle = useContext(CardStyleContext)
  if (!cardStyle) {
    return null
  }
  return <img width="150" src={`${cardStyle.style}/${card.back}`} alt="Karte" />
}
