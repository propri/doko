import React from 'react'
import { useNextCard } from './api'

const Next = () => {
  const { data: next } = useNextCard()
  return <div>Nächster Spieler: {next?.spieler?.name}</div>
}

export default Next
