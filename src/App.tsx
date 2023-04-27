import React from 'react'
import './App.css'
import User from './User'
import ActivePlayer from './ActivePlayer'
import Player from './Player'
import Stich from './Stich'
import Next from './Next'
import LetzterStich from './LetzterStich'

function App() {
  return (
    <div className="App">
      <div className="PlayingSurface">
        {/* login etc.*/}
        <User />
        <Player position="left" />
        <Player position="top" />
        <Player position="right" />
        <ActivePlayer />
        <Stich />
        <Next />
        <LetzterStich />
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
