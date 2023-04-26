import React from 'react'
import { useQuery } from '@tanstack/react-query'

const Next = () => {
  const { data: next } = useQuery({
    queryKey: ['naechste-karte'],
    queryFn: async () => {
      const response = await fetch('/naechste-karte')
      if (!response.ok) {
        throw new Error('Network error')
      }
      return response.json()
    },
  })

  return <div>Nächster Spieler: {next?.spieler?.name}</div>
}

export default Next
