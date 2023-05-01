import React, { useState } from 'react'

import { useQuery } from '@tanstack/react-query'

const LetzterStich = () => {
  const [hidden, setHidden] = useState(true)
  const { data: stiche } = useQuery({
    queryKey: ['letzter-stich'],
    queryFn: async () => {
      const response = await fetch('/letzter-stich')
      if (!response.ok) {
        throw new Error('Networ error')
      }
      return response.json()
    },
    refetchInterval: 1000,
  })

  return (
    <div id="debug">
      <button onClick={() => setHidden((ov) => !ov)}>
        Toggle Letzter Stich
      </button>
      {!hidden && (
        <textarea cols={80} rows={40}>
          {JSON.stringify(
            {
              gespielteKarten: stiche.gespielteKarten.map(
                ({
                  card,
                  spieler,
                }: {
                  card: { farbe: string; wert: string }
                  spieler: string
                }) => ({
                  card: `${card.farbe} ${card.wert}`,
                  spieler,
                })
              ),
              gewinner: stiche.gewinner,
            },
            undefined,
            2
          )}
        </textarea>
      )}
    </div>
  )
}

export default LetzterStich
