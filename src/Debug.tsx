import React, { useState, useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'

const Debug = () => {
  const [hidden, setHidden] = useState(true)
  const { data: stiche } = useQuery({
    queryKey: ['debug', 'stiche'],
    queryFn: async () => {
      const response = await fetch('/debug/stiche')
      if (!response.ok) {
        throw new Error('Networ error')
      }
      return response.json()
    },
    refetchInterval: 1000,
  })

  return (
    <div id="debug">
      <button onClick={() => setHidden((ov) => !ov)}>Toggle Debug</button>
      {!hidden && (
        <textarea cols={80} rows={40}>
          {JSON.stringify(stiche, undefined, 2)}
        </textarea>
      )}
    </div>
  )
}

export default Debug
