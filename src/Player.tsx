import React from 'react'
import { useNextCard, useUserInfo } from './api'

const relativePositions: Record<string, number> = {
  left: 1,
  top: 2,
  right: 3,
}

const Player = ({ position }: { position: string }) => {
  const { data: next } = useNextCard()
  const { data: userInfo } = useUserInfo()
  if (typeof userInfo?.position !== 'number') {
    return null
  }
  const isActive =
    (userInfo.position + relativePositions[position]) % 4 ===
    next?.spieler.position

  return (
    <div className={`Player ${position} ${isActive ? 'next' : ''}`}>
      Position: {position}
    </div>
  )
}

export default Player
