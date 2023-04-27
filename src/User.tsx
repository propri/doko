import React, { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'

import { useUserInfo } from './api'

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

  const { data: userInfo } = useUserInfo()

  const handleLogin = async (ev: any) => {
    ev.preventDefault()
    login({ username, password })
  }

  if (userInfo?.loggedIn) {
    return null
  }

  return (
    <div>
      {!userInfo?.loggedIn && (
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
