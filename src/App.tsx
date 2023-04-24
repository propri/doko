import React, { useState, useEffect } from 'react'
import './App.css'
import { Card } from '../common/cards'
//import { CardBack, CardFront } from './Cards'
import { CardFront, sortCards } from './Cards'

function App() {
  //const [myCards, setMyCards] = useState(shuffle(Cards))
  //const [cardNumbers, setCardNumbers] = useState(12)
  const cardNumbers = 12
  const offsetBase = cardNumbers / 3
  //
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState('')
  const [cards, setCards] = useState<Card[]>([])

  const [userInfo, setUserInfo] = useState<{
    loggedIn: boolean
    user?: string
  }>({ loggedIn: false })
  const [checkAgain, setCheckAgain] = useState(0)

  useEffect(() => {
    fetch('/userinfo')
      .then((res) => res.json())
      .then((data) => setUserInfo(data.message))
  }, [checkAgain])

  /* TODO: type ev? */
  //const clickHandler = (ev: any) => {
  //console.log(ev.target.id)
  /* () => console.log(`${card.suit} - ${card.value} (${card.back})`) */
  //console.log(ev)
  //setCardNumbers((ov) => (ov -= 1))
  //fetch('/play-card', {
  //method: 'POST',
  //body: JSON.stringify({
  //card: ev.target.id,
  //}),
  //})
  //.then((res) => res.json())
  //.then((dt) => console.log(dt))
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
      .then(() => setCheckAgain((ov) => ov + 1))
  }

  const getCards = (ev: any) => {
    ev.preventDefault()

    fetch('/my-cards')
      .then((res) => res.json())
      .then((crds) => {
        sortCards(crds)
        setCards(crds)
      })
  }

  //useEffect(() => {
  //setInterval(() => {
  //if (userInfo?.loggedIn) {
  //getCards({ preventDefault: () => {} })
  //}
  //}, 1000)
  //}, [userInfo?.loggedIn])

  return (
    <div className="App">
      <div>
        {!userInfo.loggedIn && (
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
          </form>
        )}
        {userInfo.loggedIn && (
          <div>
            <p>Hallo {userInfo?.user}</p>
            <p>
              <button onClick={getCards}>get Cards</button>
            </p>
          </div>
        )}
      </div>
      <div className="PlayingSurface">
        <div className="player ActivePlayer">
          {cards.map((card, idx) => (
            <div
              className="card"
              style={{ left: `-${offsetBase * idx}%` }}
              key={`${card.farbe}-${card.wert}-${card.back}`}
              //onClick={clickHandler}
            >
              <CardFront card={card} />
            </div>
          ))}
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
