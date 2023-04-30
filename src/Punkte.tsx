import React from 'react'
import { useMutation } from '@tanstack/react-query'

import { usePunkte, useCanStartNextRound } from './api'

const Punkte = () => {
  const { data: punkte, error } = usePunkte()

  const { data } = useCanStartNextRound()

  const { mutate: austeilen, isLoading } = useMutation({
    mutationKey: ['startnextround'],
    mutationFn: async () => {
      const response = await fetch('/naechste-runde')
      if (!response.ok) {
        throw new Error('Naechste Runde kann noch nicht gestartet werden')
      }
    },
  })

  if (error || !punkte || !data) {
    return null
  }

  return (
    <div id="punkte">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Punkte</th>
          </tr>
        </thead>
        <tbody>
          {punkte.map(({ spieler, punkte }) => (
            <tr>
              <td>{spieler.name}</td>
              <td>{punkte}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {data?.canStartNextRound && (
        <button disabled={isLoading} onClick={() => austeilen()}>
          Karten geben
        </button>
      )}
    </div>
  )
}

export default Punkte
