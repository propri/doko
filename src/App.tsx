import React, { useState, useEffect } from 'react'
import './App.css'
//import Cards, { shuffle } from '../common/cards'
//import { CardBack, CardFront } from './Cards'

function App() {
  //const [myCards, setMyCards] = useState(shuffle(Cards))
  //const [cardNumbers, setCardNumbers] = useState(12)
  const [data, setData] = useState("")
  //const offsetBase = cardNumbers / 3

  //const playerActive = myCards.slice(0, 12)
  //const playerLeft = myCards.slice(12, 24)
  //const playerTop = myCards.slice(24, 36)
  //const playerRight = myCards.slice(36, 48)

  /* TODO: type ev? */
  //const clickHandler = (ev: any) => {
    ///* () => console.log(`${card.suit} - ${card.value} (${card.back})`) */
    //console.log(ev)
    //setCardNumbers((ov) => ov -= 1)
  //}

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((dt) => setData(dt.message))
  }, [])

  console.log(data)

  return (
    <div className="App">
      <div className="PlayingSurface">
        <div className="player ActivePlayer">
          {
            //playerActive.map((card, idx) => (
              //<div className="card" style={{ left: `-${offsetBase * idx}%`}} key={`${card.suit}-${card.value}-${card.back}`} onClick={clickHandler} id={`${card.suit}-${card.value}-${card.back}`} >
                //<CardFront card={card} />
              //</div>
            //))
          }
        </div>
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
    </div>
  )
}

export default App
