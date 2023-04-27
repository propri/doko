import React, { useState } from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

export default function Login() {
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
      if (!response.ok) {
        throw new Error('Network response not OK')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userinfo'] })
      queryClient.invalidateQueries({ queryKey: ['my-cards'] })
    },
  })

  const { data: userInfo } = useQuery({
    queryKey: ['userinfo'],
    queryFn: async () => {
      const response = await fetch('/userinfo')
      if (!response.ok) {
        throw new Error('Network response not OK')
      }
      return response.json()
    },
  })

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
