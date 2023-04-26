import React from 'react'
import { useQuery } from '@tanstack/react-query'

const Stich = () => {
  const { data: stichData } = useQuery({
    queryKey: ['stich'],
    queryFn: async () => {
      const response = await fetch('/stich')
      if (!response.ok) {
        throw new Error('Network response not OK')
      }
      return response.json()
    },
    refetchInterval: 1000, //ms
  })

  return (
    <div>
      <p>aktueller Stich</p>
      {stichData?.map(({ card, spieler }) => (
        <p key={`${card.wert}-${card.farbe}-${spieler.position}`}>
          {card.wert}
          {card.farbe}
          {spieler.name}
        </p>
      ))}
    </div>
  )
}

export default Stich
