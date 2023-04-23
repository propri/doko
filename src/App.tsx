import React, { useState } from 'react'
import './App.css'
//import Cards, { shuffle } from '../common/cards'
//import { CardBack, CardFront } from './Cards'

function App() {
  //const [myCards, setMyCards] = useState(shuffle(Cards))
  //const [cardNumbers, setCardNumbers] = useState(12)
  //const offsetBase = cardNumbers / 3
  //
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState('')
  const [cards, setCards] = useState([])

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

  const handleLogin = (ev: any) => {
    ev.preventDefault()
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((dt) => setResult(dt.message))
  }

  const getCards = (ev: any) => {
    ev.preventDefault()

    fetch('/my-cards')
      .then((res) => res.json())
      .then((crds) => setCards(crds))
  }

  return (
    <div className="App">
      <div>
        <form onSubmit={handleLogin}>
          <p>
            User:
            <input
              type="text"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
            />
          </p>
          <p>
            Passord:
            <input
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </p>
          <p>
            <button type="submit">Log in</button>
          </p>
          <p>{result}</p>
          <p>{JSON.stringify(cards)}</p>
          <p>
            <button onClick={getCards}>get Cards</button>
          </p>
        </form>
      </div>
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
