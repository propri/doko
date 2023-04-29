import React from 'react'

import { usePunkte } from './api'

const Punkte = () => {
  const { data: punkte, error } = usePunkte()

  if (error || !punkte) {
    return null
  }

  console.log(punkte)

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
    </div>
  )
}

export default Punkte
