import React, { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'

import { useUserInfo } from './api'

export default function Login() {
  const [username, setUsername] = useState('')

  const queryClient = useQueryClient()

  const { mutate: login } = useMutation({
    mutationFn: async ({ username }: { username: string }) => {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
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
    login({ username })
  }

  if (userInfo?.loggedIn) {
    return null
  }

  return (
    <div>
      {!userInfo?.loggedIn && (
        <form onSubmit={handleLogin}>
          <p>
            Username:
            <input
              type="text"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
            />
          </p>
          <p>
            <button type="submit">Username festlegen</button>
          </p>
        </form>
      )}
    </div>
  )
}
