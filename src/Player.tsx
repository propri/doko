import React from 'react'
import { useNextCard, usePlayerInfo, useUserInfo } from './api'

const relativePositions: Record<string, number> = {
  left: 1,
  top: 2,
  right: 3,
}

const Player = ({ position }: { position: string }) => {
  const { data: next } = useNextCard()
  const { data: userInfo } = useUserInfo()
  const { data: playerInfo } = usePlayerInfo()

  if (typeof userInfo?.position !== 'number' || !playerInfo) {
    return null
  }
  const playerPosition = (userInfo.position + relativePositions[position]) % 4
  const isActive = playerPosition === next?.spieler.position

  const { name, geber }: { name: string; geber: boolean } = playerInfo.find(
    (p) => p.position === playerPosition
  ) ?? { name: '', geber: false }

  return (
    <div className={`Player ${position} ${isActive ? 'next' : ''}`}>
      {`${name}${geber ? ' (G)' : ''}`}
    </div>
  )
}

export default Player
