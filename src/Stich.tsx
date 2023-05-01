import React from 'react'
import { CardFront } from './Cards'
import { useUserInfo, useStich } from './api'

type Position = 'top' | 'left' | 'bottom' | 'right'

const positions: Position[] = ['bottom', 'left', 'top', 'right']

const Stich = () => {
  const { data: stichData } = useStich()
  const { data: userInfo } = useUserInfo()

  if (!userInfo?.loggedIn) {
    return null
  }

  const mapPositions = (position: number): Position => {
    let spielerPosition = userInfo?.position
    if (typeof spielerPosition !== 'number') {
      throw new Error('keine Position für Spieler vorhanden??')
    }
    /* aktiver Spieler immer Bottom Position. Alle anderen relative dazu. */
    const relativePosition =
      (position - spielerPosition + positions.length) % positions.length
    return positions[relativePosition]
  }

  return (
    <>
      <div id="stich">
        <div>
          {stichData?.map((sc, idx) => (
            <div
              style={{ zIndex: idx + 1 }}
              className={`position${mapPositions(sc.spieler.position)} cardbox`}
            >
              <CardFront card={sc.card} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Stich
