import React from 'react'
import './App.css'
import User from './User'
import ActivePlayer from './ActivePlayer'
import Player from './Player'
import Stich from './Stich'
import Next from './Next'
import LetzterStich from './LetzterStich'
import CardStyleSelector from './CardStyleSelector'
import Punkte from './Punkte'

import { useUserInfo } from './api'

function App() {
  const { data: userInfo } = useUserInfo()

  return (
    <div className="App">
      <div className="PlayingSurface">
        {/* login etc.*/}
        <User />
        {userInfo?.loggedIn && (
          <>
            <CardStyleSelector />
            <Player position="left" />
            <Player position="top" />
            <Player position="right" />
            <ActivePlayer />
            <Stich />
            <Next />
            <LetzterStich />
            <Punkte />
          </>
        )}
      </div>
      {/*
        <div className="player PlayerLeft">
          {
            //playerLeft.map((card, idx) => (
            //<div className="card" style={{ left: `-${offsetBase * (idx +1)}%`}} key={`${card.suit}-${card.value}-${card.back}`}>
            //<CardBack card={card} />
            //</div>
            //))
          }
        </div>
        <div className="player PlayerTop">
          {
            //playerTop.map((card, idx) => (
            //<div className="card" style={{ left: `-${offsetBase * (idx +1)}%`}} key={`${card.suit}-${card.value}-${card.back}`}>
            //<CardBack card={card} />
            //</div>
            //))
          }
        </div>
        <div className="player PlayerRight">
          {
            //playerRight.map((card, idx) => (
            //<div className="card" style={{ left: `-${offsetBase * (idx +1)}%`}} key={`${card.suit}-${card.value}-${card.back}`}>
            //<CardBack card={card} />
            //</div>
            //))
          }
        </div>
      </div>
      */}
    </div>
  )
}

export default App
