import React, { useState } from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

export default function Login() {
  //const [result, setResult] = useState({ message: '' })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const queryClient = useQueryClient()

  const { mutate: login } = useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string
      password: string
    }) => {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
      //.then((res) => res.json())
      //.then((dt) => setResult(dt.message))
      if (!response.ok) {
        throw new Error('Network response not OK')
      }
      //setResult(await response.json())
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userinfo'] })
      queryClient.invalidateQueries({ queryKey: ['my-cards'] })
    },
  })

  const {
    //isLoading,
    //error,
    data: userInfo,
  } = useQuery({
    queryKey: ['userinfo'],
    queryFn: async () => {
      const response = await fetch('/userinfo')
      if (!response.ok) {
        throw new Error('Network response not OK')
      }
      return response.json()
    },
  })

  //const [userInfo, setUserInfo] = useState<{
  //loggedIn: boolean
  //user?: string
  //}>({ loggedIn: false })

  //useEffect(() => {
  //fetch('/userinfo')
  //.then((res) => res.json())
  //.then((data) => setUserInfo(data.message))
  //}, [checkAgain])

  const handleLogin = async (ev: any) => {
    ev.preventDefault()
    login({ username, password })
  }

  if (userInfo?.message?.loggedIn) {
    return null
  }

  return (
    <div>
      {!userInfo?.message?.loggedIn && (
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
        </form>
      )}
    </div>
  )
}
